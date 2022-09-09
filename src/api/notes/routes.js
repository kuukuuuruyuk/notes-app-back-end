/**
 * Routes app
 * @param {any} handlers
 * @return {Array}
 */
function routes(handlers) {
  return [
    {
      method: 'POST',
      path: '/notes',
      handler: handlers.postNoteHandler,
    },
    {
      method: 'GET',
      path: '/notes',
      handler: handlers.getNotesHandler,
    },
    {
      method: 'GET',
      path: '/notes/{id}',
      handler: handlers.getNoteByIdHandler,
    },
    {
      method: 'PUT',
      path: '/notes/{id}',
      handler: handlers.putNoteByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/notes/{id}',
      handler: handlers.deleteNoteByIdHandler,
    },
  ];
}

module.exports = routes;
