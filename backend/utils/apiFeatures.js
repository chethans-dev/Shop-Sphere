class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // search
  search() {
    const keyword = this.queryString?.keyword
      ? {
          $or: [
            {
              name: {
                $regex: this.queryString?.keyword,
                $options: "i",
              },
            },
            {
              category: {
                $regex: this.queryString?.keyword,
                $options: "i",
              },
            },
            {
              description: {
                $regex: this.queryString?.keyword,
                $options: "i",
              },
            },
          ],
        }
      : {};

    // Apply the search filter to the query
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter
  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ["keyword", "page", "limit", "sort"];
    excludeFields.forEach((excludeField) => delete queryObj[excludeField]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  // paginate
  paginate() {
    const page = this.queryString?.page * 1 || 1;
    const limit = this.queryString?.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
