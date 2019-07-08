const Post = require("../../models/Post");
const defaultFields = ["date", "owner", "content", "likedBy", "_id"];

module.exports.getDocsOwnersData = async documents => {
  const ownersIds = [];
  documents.forEach(({ owner }) => {
    if (ownersIds.indexOf(owner) === -1) ownersIds.push(owner);
  });

  const fieldsToSelect = "username gender";
  const owners = await User.find({ _id: { $in: ownersIds } }).select(
    fieldsToSelect
  );
  const ownersData = {};
  owners.forEach(({ _id, username, gender }) => {
    ownersData[_id] = { authorName: username, authorGender: gender };
  });

  return ownersData;
};

module.exports.getDocsWithAuthorData = (
  documents,
  ownersData,
  additionalFields = []
) => {
  const documentsWithAuthorData = [];
  const fields = [...defaultFields, ...additionalFields];
  documents.forEach(doc => {
    const documentData = {};
    fields.forEach(field => (documentData[field] = doc[field]));
    documentsWithAuthorData.push({ ...documentData, ...ownersData[doc.owner] });
  });

  return documentsWithAuthorData;
};

module.exports.createNewDoc = async (req, model, additionalData = []) => {
  const postData = {
    content: req.body.content,
    owner: req.user.id
  };
  if (req.body.image) postData.image = image;
  additionalData.forEach(dataItem => (postData[dataItem.key] = dataItem.value));
  const newDoc = await new model(postData).save();
  return newDoc;
};

module.exports.getDocWithAuthorData = (doc, user, additionalFields = []) => {
  const documentData = {};
  const fields = [...defaultFields, ...additionalFields];
  fields.forEach(field => (documentData[field] = doc[field]));

  const authorData = { authorName: user.username, authorGender: user.gender };
  const docWithAuthorData = { ...documentData, ...authorData };

  return docWithAuthorData;
};

module.exports.updateDoc = async (req, res, model) => {
  if (!req.body.content && !req.body.image)
    res.status(400).json({ msg: "Send correct data" });
  try {
    const doc = await model.findById(req.params.id);
    if (!doc) res.status(404).json({ msg: "Not found" });
    if (doc.owner !== req.user.id)
      res.status(403).json({ msg: "Access denied" });

    const updateData = { $set: { content: req.body.content } };
    if (req.body.image) updateData["$set"].image = req.body.image;

    await model.findByIdAndUpdate(req.params.id, updateData);
    const updatedDoc = await model.findById(req.params.id);

    return updatedDoc;
  } catch (err) {
    res.status(400).json({ msg: "Send correct data" });
    console.log(err);
  }
};

module.exports.deleteDoc = async (
  req,
  res,
  doc,
  model,
  modelsToFullyDelete,
  fieldToDeleteBy,
  checkIsPostOwner
) => {
  try {
    if (!doc) res.status(404).json({ msg: "Not found" });

    let hasAccess = false;
    const accessFields = [doc.owner];
    if (checkIsPostOwner) {
      const post = await Post.findById(doc.post);
      accessFields.push(post.owner);
    }

    accessFields.forEach(field => {
      if (field === req.user.id) hasAccess = true;
    });
    if (!hasAccess) res.status(403).json({ msg: "Access denied" });

    await model.findByIdAndDelete(req.params.id);

    modelsToFullyDelete.forEach(async modelToDelete => {
      const deleteConditions = {};
      deleteConditions[fieldToDeleteBy] = req.params.id;
      await modelToDelete.deleteMany(deleteConditions);
    });
  } catch (err) {
    console.log(err);
  }
};
