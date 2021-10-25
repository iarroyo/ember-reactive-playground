export default function () {
  this.urlPrefix = 'https://5f7dc195834b5c0016b06816.mockapi.io';
  this.namespace = '/api/v1';
  this.get('/users', (schema, request) => {
    const page = request.queryParams.page || 1;
    const itemsPerPage = request.queryParams.itemsPerPage || 25;
    const users = schema.users.all();
    const from = (page - 1) * itemsPerPage;
    const to = page * itemsPerPage;
    return {
      total: 100,
      results: users.slice(from, to).models,
    };
  });
}
