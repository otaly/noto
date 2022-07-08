const markdownToHtml = require('zenn-markdown-html').default;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const { markdown } = event.arguments;
  if (markdown == null) {
    throw new Error('Argument markdown is required.');
  }

  return convertToHTML(markdown);
};

const convertToHTML = (markdown) => {
  return markdownToHtml(markdown);
};
