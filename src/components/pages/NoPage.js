const NoPage = () => {
  return (
    <img
      src={process.env.PUBLIC_URL + "/img/404.png"}
      alt={"404"}
      loading="lazy"
    />
  );
};

export default NoPage;
