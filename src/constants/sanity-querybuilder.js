export default class QueryBuilder {
  #_queryBefore; // object

  constructor(schema = null) {
    this.#_queryBefore = {
      schema: '', // string
      one: false,
      where: [], // string array
    };

    if (schema) this.schema(schema);
  }

  schema(schema) {
    this.#_queryBefore.schema = `_type == "${schema}"`;
    return this;
  }

  and(field, paramKey, operator = '==') {
    this.#_queryBefore.where.push(` && ${field} ${operator} $${paramKey}`);
    return this;
  }

  or(field, paramKey, operator = '==') {
    this.#_queryBefore.where.push(` || ${field} ${operator} $${paramKey}`);
    return this;
  }

  getOne() {
    this.#_queryBefore.one = true;
    return this;
  }

  #_buildQuery(query) {
    if (this.#_queryBefore.schema) {
      query += this.#_queryBefore.schema;
    }

    query += this.#_queryBefore.where.reduce((acc, val) => acc + val);

    return `${query}]${this.#_queryBefore.one ? '[0]' : ''}`;
  }

  done() {
    return this.#_buildQuery('*[');
  }
}
