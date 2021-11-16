//footer to github

export default function Footer () {
    return (
      <div
        className="text-center"
        data-testid="footer"
        style={{
          marginTop: "200px",
          marginBottom: "20px",
        }}
      >
        app made by &nbsp;
        <a
          href="https://github.com/adnjoo/movie-app-auth-frontend"
          target="_blank"
          rel="noreferrer"
        >
          adnjoo
        </a>
      </div>
    );
  };