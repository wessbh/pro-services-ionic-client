import { Component, OnInit } from '@angular/core';

import { Base64 } from '@ionic-native/base64/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  regData = { avatar:'', email: '', password: '', fullname: '' };
  imgPreview = 'assets/avatar.png';
  constructor(public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private alertController: AlertController) {}
  getPhoto() {
    let options = {
        maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        console.log(results[i]);
        this.base64.encodeFile(results[i]).then((base64File: string) => {
        this.regData.avatar = base64File;
        }, (err) => {
          console.log(err);
          });
        }        
      }, (err) => { });
  } 
  async onSelectChange($event){
    console.log("done");
    var alert: any;
    if($event.target.value == "credit"){
      alert = await this.alertController.create({
      header: 'Enter you credit card details',
      inputs: [
        {
          name: 'cardnumber',
          placeholder: 'Card number',
          type: 'number'
        },
        {
          name: 'expiration',
          type: 'date'
        },
        {
          name: 'ccv',
          placeholder: 'CCV',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
          }
        }
      ]
    });

  await alert.present();
  }
  if($event.target.value == "edinar"){
    alert = await this.alertController.create({
    header: 'Enter you edinar details',
    inputs: [
      {
        name: 'cardnumber',
        placeholder: 'Edinar card number',
        type: 'number'
      },
      {
        name: 'password',
        placeholder: 'Password (8 digits)',
        type: 'password',
        label: 'ok'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: data => {
        }
      }
    ]
  });
  
  await alert.present();
  }
  if($event.target.value == "payment_method"){
    console.log("nothing to do here");
    
  }
}      
  ngOnInit() {
  }

}
