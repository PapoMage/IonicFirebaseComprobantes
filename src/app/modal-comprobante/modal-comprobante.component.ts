import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-comprobante',
  templateUrl: './modal-comprobante.component.html',
  styleUrls: ['./modal-comprobante.component.scss'],
})
export class ModalComprobanteComponent {
  @Input() domicilio:string;
  @Input() nombre:string;
  @Input() tipoTrabajo:string;
  @Input() descripcionTrabajo:string;
  @Input() importe:number;
  @Input() firma:string;
  @Input() foto:string
  
  constructor(private modalCtrl: ModalController) { }

cerrarModal(){
  this.modalCtrl.dismiss();
}

}
