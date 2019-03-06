export default (config, options) => {
  config.output.publicPath = options.production
    ? "/chi-square-calculator/"
    : "/";
};
