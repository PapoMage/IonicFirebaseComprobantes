import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ModalController } from '@ionic/angular';
import { ModalComprobanteComponent } from '../modal-comprobante/modal-comprobante.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  
  itemRef: any;
  comprobantes = [];

  constructor(private db: AngularFireDatabase, private modalCtrl:ModalController) {}

ngOnInit(){
  this.itemRef = this.db.object('comprobante');
  this.itemRef.snapshotChanges().subscribe(action => {
  //console.log(action.type);
  //console.log(action.key)
  //console.log(action.payload.val())

  let data = action.payload.val()
  //console.log(data);
  this.comprobantes = [];
  for (let i in data){
    let comprobanteItem = data[i];
    //console.log(comprobanteItem,i);
    comprobanteItem.key = i;
    let rutaFirma = comprobanteItem.firma;
    console.log(rutaFirma);
    this.comprobantes.push(comprobanteItem);
    //Revierto el orden del array
    this.comprobantes.reverse();
  }
});

}

buscar(event){
  let texto = event.target.value;
  
  if(event.target.value.length == 0){
    this.ngOnInit();
  } else{
    this.comprobantes= this.comprobantes.filter( (comprobante) => {return comprobante.domicilio.toLowerCase().indexOf(texto.toLowerCase())> -1} );
  }
  
}
/*
detalleComprobante(comprobante){
  console.log(comprobante);
} */

async detalleComprobante(comprobante){
  const modal = await this.modalCtrl.create({
    component: ModalComprobanteComponent,
    componentProps: {
      domicilio: comprobante.domicilio, 
      nombre: comprobante.nombre, 
      tipoTrabajo: comprobante.tipoTrabajo, 
      descripcionTrabajo: comprobante.descripcionTrabajo, 
      importe: comprobante.importe,
      firma: comprobante.firma,
      fecha: comprobante.fecha,
      foto: comprobante.foto  
  }
  })
  await modal.present();
}

}
