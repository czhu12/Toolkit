import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_SCRIPT } from "../../../api/definitions";
import { useAuth } from "../../accounts/utils";
import Modal from "../Modal";

export default function AppNavbar({ script }) {
  const { currentUser } = useAuth();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [mutateFunction, { d, l, e }] = useMutation(CREATE_SCRIPT);
  const forkApp = async () => {
    const result = await mutateFunction({
      variables: {
        input: {
          attributes: {
            title: `${script.title} Forked`,
            description: script.description,
            visibility: "public",
            code: script.code,
          },
        }
      }
    });
    if (!result.data.createScript.errors) {
      window.location.href = `/s/${result.data.createScript.script.slug}?created=true`;
    }
  }

  return (
    <div>
      <Modal show={showStatisticsModal} setShow={setShowStatisticsModal} title="Statistics">
        <div className="title has-text-centered is-1">
          {script.runCount}
        </div>
        <div className="subtitle has-text-centered is-6">Run Count</div>
      </Modal>
      <nav className="navbar">
        <div className="navbar-brand">
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-items"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="container">
          <div className={`navbar-menu ${navbarOpen && 'is-active'}`} id="navbar-items">
            <div className="navbar-end">
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <i className="fa-solid fa-gear"></i>
                </a>

                <div className="navbar-dropdown">
                  {script.user?.id === currentUser?.id && (
                    <a className="navbar-item" href={`/s/${script.slug}/edit`}>
                      Edit
                    </a>
                  )}
                  {script.user?.id !== currentUser?.id && (
                    <a className="navbar-item" href={`/s/${script.slug}/source`}>
                      View Source
                    </a>
                  )}
                  {currentUser && (
                    <a className="navbar-item" onClick={forkApp}>
                      Fork
                    </a>
                  )}
                  {!currentUser && (
                    <a className="navbar-item" href="/sign_up">
                      Create an Account to Fork
                    </a>
                  )}
                  <a className="navbar-item" onClick={() => setShowStatisticsModal(true)}>
                    Statistics
                  </a>
                  <hr className="navbar-divider" />
                  {currentUser && (
                    <a href="/me" className="navbar-item">
                      My Apps
                    </a>
                  )}
                  {!currentUser && (
                    <a href="/sign_up" className="navbar-item">
                      Create An Account
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
