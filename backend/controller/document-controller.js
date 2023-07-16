
import { Document } from '../schema/schema.js'

export const getDocument = async (id, userId, docTitle) => {
    if (id === null) 
        return;
    
    const document = await Document.findById(id);
    if(document) 
        return document;
    
    const data = {
        _id: id,
        data: "",
        owner: userId
    }
    if(docTitle) data.title = docTitle;

    return await Document.create(data);
}

export const updateDocument = async (id, data) => {
    return await Document.findByIdAndUpdate(id, { data });
}