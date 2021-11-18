//footer to github

export default function Footer () {
    return (
      <div
        className="text-center primarycolor"
        data-testid="footer"
        style={{
          marginTop: "200px",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        app made by &nbsp;
        <a
          href="https://github.com/adnjoo/movie-app-auth-frontend"
          target="_blank"
          rel="noreferrer"
          style={{color:'white'}}
        >
          adnjoo
        </a>
      </div>
    );
  };