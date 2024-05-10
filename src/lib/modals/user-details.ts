import {Schema, model, models} from "mongoose";

const adminSchema = new Schema({
    name: String,
    email: { type: String, unique: true},
    password: String,
});

const admins = models.admin || model('admin', adminSchema);

export default admins;
