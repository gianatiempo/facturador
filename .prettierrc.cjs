module.exports = {
  singleQuote: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^vite', '^react', '^antd', 'components/', 'pages/', 'hooks/', 'utils/', '^[./]'],
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCaseInsensitive: true,
  printWidth: 150,
};
