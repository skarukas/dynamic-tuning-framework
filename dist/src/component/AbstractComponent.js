"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractComponent {
    constructor(root) {
        this.root = root;
    }
    getRoot() { return this.root; }
    getAllNotes() { return this.notes; }
    getNoteById(id) {
        for (let note of this.notes) {
            if (note.id == id)
                return note;
        }
    }
    transposeBy(interval) {
        for (let note of this.notes)
            note.transposeBy(interval);
    }
    filter(callback) {
        return this.notes.filter(callback);
    }
}
exports.default = AbstractComponent;
//# sourceMappingURL=AbstractComponent.js.map