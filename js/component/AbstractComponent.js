export default class AbstractComponent {
    constructor(root) {
        this.root = root;
    }
    getRoot() { return this.root; }
    getAllNotes() { return this.notes; }
    getNoteByName(name) {
        for (let note of this.notes) {
            if (note.name == name)
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
//# sourceMappingURL=AbstractComponent.js.map