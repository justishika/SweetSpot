import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Catalog from "@/pages/Catalog";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Bakers from "@/pages/Bakers";
import About from "@/pages/About";
import Favorites from "@/pages/Favorites";
import { CartProvider } from "@/context/CartContext";
import { LikeProvider } from "@/context/LikeContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/catalog" component={Catalog}/>
      <Route path="/product/:id" component={ProductDetail}/>
      <Route path="/cart" component={Cart}/>
      <Route path="/checkout" component={Checkout}/>
      <Route path="/bakers" component={Bakers}/>
      <Route path="/about" component={About}/>
      <Route path="/favorites" component={Favorites}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <LikeProvider>
            <Toaster />
            <Layout>
              <Router />
            </Layout>
          </LikeProvider>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App; 