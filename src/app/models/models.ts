import { Sequelize, Model, STRING, INTEGER, NUMBER } from 'sequelize'

export const sequelize = new Sequelize('postgres', 'danil', 'danman203', {
  host: 'localhost',
  dialect: 'postgres',
});

export class User extends Model {
  password: any;
  id: any;
}

User.init(
  {
    id: {
      type: STRING,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Users',
  }
)

export class Company extends Model {
  password: any;
  id: any;
}

Company.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    login: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    type: {
      type: STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Company',
  }
)

export class Category extends Model { }

Category.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Categories',
    timestamps: false,
  }
)

export class Product extends Model { }

Product.init(
  {
    id: {
      type: NUMBER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    description: {
      type: STRING,
      allowNull: false,
    },
    price: {
      type: NUMBER,
      allowNull: false,
    },
    clicks: {
      type: NUMBER,
      allowNull: false,
      defaultValue: 0,
    }
  },
  {
    sequelize,
    modelName: 'Products',
    timestamps: true,
  }
)

Company.hasMany(Product, {
  onDelete: "cascade",
})
Category.hasMany(Product, {
  onDelete: "cascade"
})

export class Basket extends Model { }

Basket.init(
  {
    id: {
      type: NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: NUMBER,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Baskets',
    timestamps: false,
  }
)

User.hasOne(Basket, {
  onDelete: "cascade",
})

Basket.hasMany(Product, {
  onDelete: "NO ACTION",
})

export class Comment extends Model { }

Comment.init(
  {
    id: {
      type: NUMBER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Comments',
    timestamps: true,
  }
)

Comment.hasOne(User, {
  onDelete: "cascade",
})

Product.hasMany(Comment, {
  onDelete: "cascade",
})




