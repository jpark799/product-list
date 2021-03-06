const router = require('express').Router()
const faker = require('faker')
const Product = require('../models/product')
const Review = require('../models/review')



router.get('/generate-fake-data', (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product()

    product.category = faker.commerce.department()
    product.name = faker.commerce.productName()
    product.price = faker.commerce.price()
    product.image = 'https://www.oysterdiving.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'

    product.save((err) => {
      if (err) throw err
    })
  }
  res.end()
})


// GET products according to page number
router.get('/products', (req, res, next) => {
    // number of items per page
    const perPage = 9;

    // returns the page number or 1 if page number is not present because 1 is the default
    const page = req.query.page || 1


    Product
        .find({})
        // renders correct page number
        .skip((perPage * page) - perPage)
        // limits to 9 items
        .limit(perPage)
        .exec((error, products) => {
            Product.count().exec((err, count) => {
                if (err) return next(err)
                res.send(products)
            })
        })
})



// GET /products/:product Returns a specific product by it's id

router.get('/products/:productId', (req, res, next) => {
  const productId = req.params.productId
  Product
    .findById(productId)
    .exec((err, product) => {
      res.send(product);
      console.log(product);
      })
});


// GET /reviews returns up to 40 reviews at a time

router.get("/reviews", (req, res) => {
  Review
      .find({})
      .limit(40)
      .exec((err, reviews) => {
          Review.count().exec((err, count) => {
              if (err) return next(err)
              res.send(reviews)
          })
      })
  });

// POST /products Creates a new product in the database

router.post('/products', (req, res, next) => {
  
})


// POST /:product/reviews Creates a new review in the database by adding it to the respective product's reviews array

router.post('products/:product/reviews'), (req, res, next) => {
  const productId = req.params.productId
  Review
    .findById(productId)
    // then some pushing into an array
})


// DELETE /products/:product Deletes a product by id

router.delete('/products/:product', (req,res, next) => {
  const productId = req.params.product
  Review.findByIdAndDelete(productId, (err, product) => {
      if (err) throw err;
      res.status(200).send("Product successfully deleted ");
  })
});

// DELETE /reviews/:review Deletes a review by id
router.delete("/reviews/:review", (req, res) => {
  const productId = req.params.review
  Review.findByIdAndDelete(productId, (err, review) => {
      if (err) throw err;
      res.status(200).send("Review successfully deleted ");
  })
});




module.exports = router