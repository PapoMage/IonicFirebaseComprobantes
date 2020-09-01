import { Component, OnInit, ViewChild } from '@angular/core';

import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AlertController, ToastController  } from '@ionic/angular';

import { FormGroup, FormBuilder, RequiredValidator, Validators, FormControl } from '@angular/forms';
import SignaturePad from 'signature_pad';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  comprobanteForm: FormGroup;
  signaturePad: SignaturePad;
  @ViewChild('canvas', { static: true }) signaturePadElement;
  constructor(private fb:FormBuilder, private db: AngularFireDatabase, public alertController: AlertController,public toastController: ToastController, private router:Router) {}
  //constructor(private datePicker: DatePicker) { }

  ngOnInit(){
    this.comprobanteForm = this.fb.group({
      nombre:[null],
      domicilio:[null],
      tipoTrabajo:[null],
      descripcionTrabajo:[null],
      importe:[null],
      firma:[null]
    }),
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    //Limpio la firma y seteo un color al lapiz
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(0,0,255)';
  }

  crear(){
    let comprobante ={
      nombre : this.comprobanteForm.controls['nombre'].value,
      domicilio : this.comprobanteForm.controls['domicilio'].value,
      tipoTrabajo : this.comprobanteForm.controls['tipoTrabajo'].value,
      descripcionTrabajo : this.comprobanteForm.controls['descripcionTrabajo'].value,
      importe : this.comprobanteForm.controls['importe'].value,
      firma : this.signaturePad.toDataURL(),//this.comprobanteForm.controls['firma'].value
      fecha: this.obtenerFecha().toString()
    };
    
    //console.log(comprobante),
    //console.log(this.comprobanteForm.value);
    //console.log(this.signaturePad.toDataURL());
//Control de campos  
  if(comprobante.nombre == null || comprobante.domicilio ==null || comprobante.tipoTrabajo ==null || comprobante.descripcionTrabajo == null || comprobante.importe == null){
    this.completarDatos();
  }else{
    this.db.database.ref('comprobante').push(comprobante);
    //this.confirmarDatos();
    this.notificacionComprobante();
    this.ngOnInit();
    this.router.navigate(['/']);
  }

  
  
   //this.obtenerFecha().toString();
  //console.log(comprobante);
    console.log("Sali de crear");
  }

  reiniciarFirma(){
    this.signaturePad.clear();
  }

  obtenerFecha(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var hh = String(today.getHours()).padStart(2, '0');;
    var min = String(today.getMinutes()).padStart(2, '0');;
    
    return ( dd + '/' + mm + '/' + yyyy+' '+hh+':'+min);
  }

 
    async completarDatos() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Datos Incompletos',
        //subHeader: 'Pendiente',
        message: 'Por favor complete todos los campos.',
        buttons: [{text:'OK',handler: () => {
          console.log('Click Ok');
        }}],
        
      });
  
      await alert.present();
    }
/*
    async confirmarDatos() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Guardar Comprobante',
        //subHeader: 'Pendiente',
        message: 'Esta seguro de guardar el comprobante?.',
        buttons: [{text:'Sí',handler: () => {
          console.log('Click Sí');
          this.db.database.ref('comprobante').push(comprobante);
          ;
        }},{text:'No',handler: () => {
          console.log('Click No');
        }}],
        
      });
  
      await alert.present();
      console.log(alert.present);
    }
*/
    async notificacionComprobante() {
      const toast = await this.toastController.create({
        message: 'Se ha creado correctamente el comprobante.',
        duration: 2000
      });
      toast.present();
    }

 
}

