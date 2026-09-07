import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useConfigContext, ConfigType } from "../context/ConfigContext";
import "./Admin.css";

const STORAGE_KEY = "admin_password";

// Deep clone helper (config is plain JSON-shaped data)
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

// Resize + compress an uploaded image client-side before turning it into
// a base64 data URL, so the saved config stays small enough for the DB.
const fileToResizedDataUrl = (
  file: File,
  maxWidth: number
): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = reject;

    reader.onload = () => {
      const img = new Image();

      img.onerror = reject;

      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);

        const canvas = document.createElement("canvas");

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return reject(new Error("Canvas not supported"));
        }

        ctx.drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height
        );

        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });


// The current config contains email, github, linkedin and x.
// Facebook and Instagram are kept as optional admin-only fields so
// the existing dashboard UI can continue to support them.
type AdminContact = ConfigType["contact"] & {
  facebook?: string;
  instagram?: string;
};

const Admin = () => {
  const { config, refresh } = useConfigContext();

  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [draft, setDraft] = useState<ConfigType>(clone(config));

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Try a stored password on load
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (stored) {
      verifyPassword(stored, true);
    } else {
      setCheckingAuth(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whenever the live config updates (e.g. after first fetch), reset the draft
  useEffect(() => {
    setDraft(clone(config));
  }, [config]);

  const verifyPassword = async (
    pwd: string,
    silent = false
  ) => {
    if (!silent) {
      setAuthError("");
    }

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: pwd,
        }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        sessionStorage.setItem(STORAGE_KEY, pwd);

        setPassword(pwd);
        setAuthed(true);
      } else if (!silent) {
        setAuthError("Wrong password.");
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      if (!silent) {
        setAuthError(
          "Couldn't reach the server. Try again."
        );
      }
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    verifyPassword(password);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);

    setAuthed(false);
    setPassword("");
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password,
        },
        body: JSON.stringify({
          config: draft,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSaveMessage("Saved — live site updated.");

        await refresh();
      } else {
        setSaveMessage(
          data.error || "Failed to save."
        );
      }
    } catch (err) {
      setSaveMessage(
        "Network error while saving."
      );
    } finally {
      setSaving(false);

      setTimeout(() => {
        setSaveMessage("");
      }, 4000);
    }
  };

  // --------------------------------------------------
  // Field update helpers
  // --------------------------------------------------

  const updateDeveloper = (
    field: keyof ConfigType["developer"],
    value: string
  ) =>
    setDraft((d) => ({
      ...d,
      developer: {
        ...d.developer,
        [field]: value,
      },
    }));

  const updateMeta = (
    field: keyof ConfigType["meta"],
    value: string
  ) =>
    setDraft((d) => ({
      ...d,
      meta: {
        ...d.meta,
        [field]: value,
      },
    }));

  // --------------------------------------------------
  // Profile photo
  // --------------------------------------------------

  const [uploadingPhoto, setUploadingPhoto] =
    useState(false);

  const handleProfilePhotoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingPhoto(true);

    try {
      const dataUrl =
        await fileToResizedDataUrl(file, 600);

      updateDeveloper(
        "profileImage",
        dataUrl
      );
    } catch (err) {
      setSaveMessage(
        "Couldn't process that image."
      );
    } finally {
      setUploadingPhoto(false);

      e.target.value = "";
    }
  };

  // --------------------------------------------------
  // Project images
  // --------------------------------------------------

  const [
    uploadingProjectImage,
    setUploadingProjectImage,
  ] = useState<number | null>(null);

  const handleProjectImageUpload = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setUploadingProjectImage(index);

    try {
      const dataUrl =
        await fileToResizedDataUrl(file, 800);

      updateProject(
        index,
        "image",
        dataUrl
      );
    } catch (err) {
      setSaveMessage(
        "Couldn't process that image."
      );
    } finally {
      setUploadingProjectImage(null);

      e.target.value = "";
    }
  };

  // --------------------------------------------------
  // Social
  // --------------------------------------------------

  const updateSocial = (
    field: keyof ConfigType["social"],
    value: string
  ) =>
    setDraft((d) => ({
      ...d,
      social: {
        ...d.social,
        [field]: value,
      },
    }));

  // --------------------------------------------------
  // About
  // --------------------------------------------------

  const updateAbout = (
    field: keyof ConfigType["about"],
    value: string
  ) =>
    setDraft((d) => ({
      ...d,
      about: {
        ...d.about,
        [field]: value,
      },
    }));

  // --------------------------------------------------
  // Contact
  // --------------------------------------------------

  const updateContact = (
    field: string,
    value: string
  ) =>
    setDraft((d) => ({
      ...d,
      contact: {
        ...d.contact,
        [field]: value,
      },
    }));

  // --------------------------------------------------
  // Skills
  // --------------------------------------------------

  const updateSkillsDevelop = (
    field: keyof ConfigType["skills"]["develop"],
    value: string | string[]
  ) =>
    setDraft((d) => ({
      ...d,
      skills: {
        ...d.skills,
        develop: {
          ...d.skills.develop,
          [field]: value,
        },
      },
    }));

  // --------------------------------------------------
  // Experience
  // --------------------------------------------------

  const updateExperience = (
    index: number,
    field: string,
    value: any
  ) =>
    setDraft((d) => {
      const experiences = clone(
        d.experiences
      );

      (experiences[index] as any)[field] =
        value;

      return {
        ...d,
        experiences,
      };
    });

  const addExperience = () =>
    setDraft((d) => ({
      ...d,
      experiences: [
        ...d.experiences,
        {
          position: "New Position",
          company: "Company",
          period: "01-2026 - Present",
          location: "Location",
          description: "",
          responsibilities: [],
          technologies: [],
        },
      ],
    }));

  const removeExperience = (
    index: number
  ) =>
    setDraft((d) => ({
      ...d,
      experiences:
        d.experiences.filter(
          (_, i) => i !== index
        ),
    }));

  // --------------------------------------------------
  // Projects
  // --------------------------------------------------

  const updateProject = (
    index: number,
    field: string,
    value: any
  ) =>
    setDraft((d) => {
      const projects = clone(
        d.projects
      );

      (projects[index] as any)[field] =
        value;

      return {
        ...d,
        projects,
      };
    });

  const addProject = () =>
    setDraft((d) => ({
      ...d,
      projects: [
        ...d.projects,
        {
          id: Date.now(),
          title: "New Project",
          category: "Full Stack",
          technologies: "",
          image: "/images/placeholder.webp",
          description: "",
          link: "",
        },
      ],
    }));

  const removeProject = (
    index: number
  ) =>
    setDraft((d) => ({
      ...d,
      projects:
        d.projects.filter(
          (_, i) => i !== index
        ),
    }));

  // --------------------------------------------------
  // Authentication loading
  // --------------------------------------------------

  if (checkingAuth) {
    return (
      <div className="admin-loading">
        Checking session…
      </div>
    );
  }

  // --------------------------------------------------
  // Login
  // --------------------------------------------------

  if (!authed) {
    return (
      <div className="admin-login">
        <form
          onSubmit={handleLogin}
          className="admin-login-box"
        >
          <h1>Admin</h1>

          <p>
            Enter the admin password to edit
            your live portfolio content.
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            autoFocus
          />

          {authError && (
            <div className="admin-error">
              {authError}
            </div>
          )}

          <button type="submit">
            Log in
          </button>

          <Link
            to="/"
            className="admin-back-link"
          >
            ← Back to site
          </Link>
        </form>
      </div>
    );
  }

  // --------------------------------------------------
  // Dashboard
  // --------------------------------------------------

  const adminContact =
    draft.contact as AdminContact;

  return (
    <div className="admin-dashboard">

      {/* Header */}

      <header className="admin-header">

        <h1>
          Portfolio Dashboard
        </h1>

        <div className="admin-header-actions">

          {saveMessage && (
            <span className="admin-save-message">
              {saveMessage}
            </span>
          )}

          <button
            className="admin-save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? "Saving…"
              : "Save changes"}
          </button>

          <button
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            Log out
          </button>

          <Link
            to="/"
            className="admin-back-link"
          >
            View site →
          </Link>

        </div>

      </header>


      {/* Site title & SEO */}

      <section className="admin-section">

        <h2>
          Site title &amp; SEO
        </h2>

        <label>

          Browser tab title

          <input
            value={
              draft.meta.siteTitle
            }
            onChange={(e) =>
              updateMeta(
                "siteTitle",
                e.target.value
              )
            }
          />

        </label>

        <label>

          Meta description
          (for search engines / link previews)

          <textarea
            value={
              draft.meta.siteDescription
            }
            onChange={(e) =>
              updateMeta(
                "siteDescription",
                e.target.value
              )
            }
          />

        </label>

      </section>


      {/* Developer */}

      <section className="admin-section">

        <h2>
          Developer
        </h2>

        <label>

          Profile photo

          <div className="admin-photo-row">

            <img
              className="admin-photo-preview"
              src={
                draft.developer.profileImage ||
                "/images/placeholder.webp"
              }
              alt="Profile preview"
            />

            <div className="admin-photo-actions">

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleProfilePhotoUpload
                }
                disabled={
                  uploadingPhoto
                }
              />

              {draft.developer
                .profileImage && (
                <button
                  type="button"
                  className="admin-remove-btn"
                  onClick={() =>
                    updateDeveloper(
                      "profileImage",
                      ""
                    )
                  }
                >
                  Reset to default photo
                </button>
              )}

              {uploadingPhoto && (
                <span>
                  Processing…
                </span>
              )}

            </div>

          </div>

        </label>

        <label>

          Display name

          <input
            value={
              draft.developer.name
            }
            onChange={(e) =>
              updateDeveloper(
                "name",
                e.target.value
              )
            }
          />

        </label>

        <label>

          Full name

          <input
            value={
              draft.developer.fullName
            }
            onChange={(e) =>
              updateDeveloper(
                "fullName",
                e.target.value
              )
            }
          />

        </label>

        <label>

          Title

          <input
            value={
              draft.developer.title
            }
            onChange={(e) =>
              updateDeveloper(
                "title",
                e.target.value
              )
            }
          />

        </label>

        <label>

          Description

          <textarea
            value={
              draft.developer.description
            }
            onChange={(e) =>
              updateDeveloper(
                "description",
                e.target.value
              )
            }
          />

        </label>

      </section>


      {/* Social / Location */}

      <section className="admin-section">

        <h2>
          Social / Location
        </h2>

        <label>

          GitHub username

          <input
            value={
              draft.social.github
            }
            onChange={(e) =>
              updateSocial(
                "github",
                e.target.value
              )
            }
          />

        </label>

        <label>

          Email

          <input
            value={
              draft.social.email
            }
            onChange={(e) =>
              updateSocial(
                "email",
                e.target.value
              )
            }
          />

        </label>

        <label>

          Location

          <input
            value={
              draft.social.location
            }
            onChange={(e) =>
              updateSocial(
                "location",
                e.target.value
              )
            }
          />

        </label>

      </section>


      {/* About */}

      <section className="admin-section">

        <h2>
          About
        </h2>

        <label>

          Title

          <input
            value={
              draft.about.title
            }
            onChange={(e) =>
              updateAbout(
                "title",
                e.target.value
              )
            }
          />

        </label>

        <label>

          Description

          <textarea
            value={
              draft.about.description
            }
            onChange={(e) =>
              updateAbout(
                "description",
                e.target.value
              )
            }
          />

        </label>

      </section>


      {/* Experience */}

      <section className="admin-section">

        <div className="admin-section-title-row">

          <h2>
            Experience
          </h2>

          <button
            className="admin-add-btn"
            onClick={addExperience}
          >
            + Add experience
          </button>

        </div>

        {draft.experiences.map(
          (exp, i) => (

            <div
              className="admin-card"
              key={i}
            >

              <div className="admin-card-header">

                <strong>
                  {exp.position ||
                    "New position"}
                </strong>

                <button
                  className="admin-remove-btn"
                  onClick={() =>
                    removeExperience(i)
                  }
                >
                  Remove
                </button>

              </div>


              <label>

                Position

                <input
                  value={
                    exp.position
                  }
                  onChange={(e) =>
                    updateExperience(
                      i,
                      "position",
                      e.target.value
                    )
                  }
                />

              </label>


              <label>

                Company

                <input
                  value={
                    exp.company
                  }
                  onChange={(e) =>
                    updateExperience(
                      i,
                      "company",
                      e.target.value
                    )
                  }
                />

              </label>


              <div className="admin-row">

                <label>

                  Period

                  <input
                    value={
                      exp.period
                    }
                    onChange={(e) =>
                      updateExperience(
                        i,
                        "period",
                        e.target.value
                      )
                    }
                  />

                </label>

                <label>

                  Location

                  <input
                    value={
                      exp.location
                    }
                    onChange={(e) =>
                      updateExperience(
                        i,
                        "location",
                        e.target.value
                      )
                    }
                  />

                </label>

              </div>


              <label>

                Description

                <textarea
                  value={
                    exp.description
                  }
                  onChange={(e) =>
                    updateExperience(
                      i,
                      "description",
                      e.target.value
                    )
                  }
                />

              </label>


              <label>

                Responsibilities
                (one per line)

                <textarea
                  value={(
                    exp.responsibilities ??
                    []
                  ).join("\n")}
                  onChange={(e) =>
                    updateExperience(
                      i,
                      "responsibilities",
                      e.target.value
                        .split("\n")
                        .filter(Boolean)
                    )
                  }
                />

              </label>


              <label>

                Technologies
                (comma separated)

                <input
                  value={
                    exp.technologies.join(
                      ", "
                    )
                  }
                  onChange={(e) =>
                    updateExperience(
                      i,
                      "technologies",
                      e.target.value
                        .split(",")
                        .map((t) =>
                          t.trim()
                        )
                        .filter(Boolean)
                    )
                  }
                />

              </label>

            </div>

          )
        )}

      </section>


      {/* Projects */}

      <section className="admin-section">

        <div className="admin-section-title-row">

          <h2>
            Projects
          </h2>

          <button
            className="admin-add-btn"
            onClick={addProject}
          >
            + Add project
          </button>

        </div>


        {draft.projects.map(
          (proj, i) => (

            <div
              className="admin-card"
              key={proj.id}
            >

              <div className="admin-card-header">

                <strong>
                  {proj.title ||
                    "New project"}
                </strong>

                <button
                  className="admin-remove-btn"
                  onClick={() =>
                    removeProject(i)
                  }
                >
                  Remove
                </button>

              </div>


              <label>

                Title

                <input
                  value={
                    proj.title
                  }
                  onChange={(e) =>
                    updateProject(
                      i,
                      "title",
                      e.target.value
                    )
                  }
                />

              </label>


              <label>

                Project image

                <div className="admin-photo-row">

                  <img
                    className="admin-photo-preview admin-photo-preview-wide"
                    src={
                      proj.image ||
                      "/images/placeholder.webp"
                    }
                    alt={`${proj.title} preview`}
                  />

                  <div className="admin-photo-actions">

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleProjectImageUpload(
                          i,
                          e
                        )
                      }
                      disabled={
                        uploadingProjectImage ===
                        i
                      }
                    />

                    {uploadingProjectImage ===
                      i && (
                      <span>
                        Processing…
                      </span>
                    )}

                  </div>

                </div>

              </label>


              <div className="admin-row">

                <label>

                  Category

                  <input
                    value={
                      proj.category
                    }
                    onChange={(e) =>
                      updateProject(
                        i,
                        "category",
                        e.target.value
                      )
                    }
                  />

                </label>


                <label>

                  Image path
                  (advanced —
                  overwritten by upload
                  above)

                  <input
                    value={
                      proj.image
                    }
                    onChange={(e) =>
                      updateProject(
                        i,
                        "image",
                        e.target.value
                      )
                    }
                  />

                </label>

              </div>


              <label>

                Technologies

                <input
                  value={
                    proj.technologies
                  }
                  onChange={(e) =>
                    updateProject(
                      i,
                      "technologies",
                      e.target.value
                    )
                  }
                />

              </label>


              <label>

                Description

                <textarea
                  value={
                    proj.description
                  }
                  onChange={(e) =>
                    updateProject(
                      i,
                      "description",
                      e.target.value
                    )
                  }
                />

              </label>


              <label>

                Live link

                <input
                  value={
                    proj.link
                  }
                  onChange={(e) =>
                    updateProject(
                      i,
                      "link",
                      e.target.value
                    )
                  }
                />

              </label>

            </div>

          )
        )}

      </section>


      {/* Skills */}

      <section className="admin-section">

        <h2>
          Skills
        </h2>

        <label>

          Title

          <input
            value={
              draft.skills.develop.title
            }
            onChange={(e) =>
              updateSkillsDevelop(
                "title",
                e.target.value
              )
            }
          />

        </label>


        <label>

          Short description

          <input
            value={
              draft.skills.develop
                .description
            }
            onChange={(e) =>
              updateSkillsDevelop(
                "description",
                e.target.value
              )
            }
          />

        </label>


        <label>

          Details

          <textarea
            value={
              draft.skills.develop.details
            }
            onChange={(e) =>
              updateSkillsDevelop(
                "details",
                e.target.value
              )
            }
          />

        </label>


        <label>

          Tools
          (comma separated)

          <input
            value={
              draft.skills.develop.tools.join(
                ", "
              )
            }
            onChange={(e) =>
              updateSkillsDevelop(
                "tools",
                e.target.value
                  .split(",")
                  .map((t) =>
                    t.trim()
                  )
                  .filter(Boolean)
              )
            }
          />

        </label>

      </section>


      {/* Contact */}

      <section className="admin-section">

        <h2>
          Contact links
        </h2>


        <div className="admin-row">

          <label>

            Email

            <input
              value={
                draft.contact.email
              }
              onChange={(e) =>
                updateContact(
                  "email",
                  e.target.value
                )
              }
            />

          </label>


          <label>

            GitHub URL

            <input
              value={
                draft.contact.github
              }
              onChange={(e) =>
                updateContact(
                  "github",
                  e.target.value
                )
              }
            />

          </label>

        </div>


        <div className="admin-row">

          <label>

            LinkedIn URL

            <input
              value={
                draft.contact.linkedin
              }
              onChange={(e) =>
                updateContact(
                  "linkedin",
                  e.target.value
                )
              }
            />

          </label>


          <label>

            Twitter/X URL

            <input
              value={
                draft.contact.x
              }
              onChange={(e) =>
                updateContact(
                  "x",
                  e.target.value
                )
              }
            />

          </label>

        </div>


        <div className="admin-row">

          <label>

            Facebook URL

            <input
              value={
                adminContact.facebook ??
                ""
              }
              onChange={(e) =>
                updateContact(
                  "facebook",
                  e.target.value
                )
              }
            />

          </label>


          <label>

            Instagram URL

            <input
              value={
                adminContact.instagram ??
                ""
              }
              onChange={(e) =>
                updateContact(
                  "instagram",
                  e.target.value
                )
              }
            />

          </label>

        </div>

      </section>


      {/* Footer save */}

      <div className="admin-footer-save">

        <button
          className="admin-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Saving…"
            : "Save changes"}
        </button>

        {saveMessage && (
          <span className="admin-save-message">
            {saveMessage}
          </span>
        )}

      </div>

    </div>
  );
};

export default Admin;