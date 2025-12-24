const memoryStore = {
    photos: [],
    messages: [],
    users: ['Ariel', 'Carlos', 'Aziel', 'Itzel', 'Gabriel', 'Arturo', 'Mireya', 'Adriana', 'Michelle', 'Zyanya'],

    counters: {
        photoId: 0,
        mssgId: 0
    },

    addPhoto(photoData){
        const newPhoto = {
            id: ++this.counters.photoId,
            base64: photoData.base64,
            date: new Date().toISOString(),
        };

        this.photos.unshift(newPhoto);
        return newPhoto;
    },

    addMsg(messageData){
        const newMssg = {
            id: ++this.counters.mssgId,

        }
    }
}