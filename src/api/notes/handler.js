/**
 * Notes handler
 */
class NotesHandler {
  /**
   * Note handler service
   * @param {any} service
   */
  constructor(service) {
    this._service = service;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  /**
   * Post note handler
   * @param {Request} request
   * @param {any} h
   * @return {any}
   */
  postNoteHandler(request, h) {
    try {
      const {title = 'untitled', body, tags} = request.payload;

      const noteId = this._service.addNote({title, body, tags});

      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  /**
   * Get note handler
   * @param {Rquest} request
   * @return {any}
   */
  getNotesHandler(request) {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  }

  /**
   * get note by id handler
   * @param {Rquest} request
   * @return {any}
   */
  getNoteByIdHandler(request) {
    try {
      const {id} = request.params;
      const note = this._service.getNoteById(id);
      return {
        status: 'success',
        data: {
          note,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  /**
   * put note by id handler
   * @param {Rquest} request
   * @return {any}
   */
  putNoteByIdHandler(request) {
    try {
      const {id} = request.params;

      this._service.editNoteById(id, request.payload);

      return {
        status: 'success',
        message: 'Catatan berhasil diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  /**
   * delete note by id handler
   * @param {Rquest} request
   * @return {any}
   */
  deleteNoteByIdHandler(request) {
    try {
      const {id} = request.params;
      this._service.deleteNoteById(id);
      return {
        status: 'success',
        message: 'Catatan berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = NotesHandler;
