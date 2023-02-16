import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Navigtion = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <div>
        <p>
          <span style={{ fontSize: "1.7rem" }}>V</span>INHER
        </p>
        <h1> React MusiX</h1>
      </div>
      <button
        onClick={() => {
          setLibraryStatus(!libraryStatus);
        }}
      >
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Navigtion;
