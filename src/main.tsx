//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.tsx'
import Layout from './layout/Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Layout>
  <App />
  </Layout>
</BrowserRouter>,
)
