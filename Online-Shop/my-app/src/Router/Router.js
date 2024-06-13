import Home from '../Components/Home'
import Product from '../Components/Product'
import ShoppingCart from '../Components/ShoppingCart'
import NotFound from '../Components/NotFound'



 const Routes=
[
    {path:'/' , element:<Home/>},
    {path:'/Product/:id' , element:<Product/>},
    {path:'/ShoppingCart' , element:<ShoppingCart/>},
    {path:'*' , element:<NotFound/>},
]

export default Routes;
