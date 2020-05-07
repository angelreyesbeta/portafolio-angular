import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando=true;
  productos: Producto[] = [];
  productosFiltrados: Producto[]=[];

  constructor(private http: HttpClient) { 

    this.cargarProductos();

  }


  private cargarProductos(){

    return new Promise((resolve, reject)=>{

      this.http.get('https://angular-html-92249.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto[])=>{
  
        //console.log(resp);
        this.productos=resp;
        this.cargando=false;
        resolve();


    });

   

    });

  }

  getProdcto(id:string){
    
    return this.http.get(`https://angular-html-92249.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto( termino:string){
    if(this.productos.length===0){
      //cargar producto

      this.cargarProductos().then(()=>{
        //Ejecutar despues de tener los productos
        //APlicar Filtro
        this.filtrarProdcutos(termino);

      });

    }else{
      // Aplicar Filtro
      this.filtrarProdcutos(termino);
    }
    
  }

  private filtrarProdcutos(termino: string){
    
    console.log(this.productos);
    this.productosFiltrados=[];

    termino=termino.toLocaleLowerCase();

    this.productos.forEach(prod =>{

      const tituloLower=prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0){
        this.productosFiltrados.push(prod);
      }
    })


  }
  

  



}
