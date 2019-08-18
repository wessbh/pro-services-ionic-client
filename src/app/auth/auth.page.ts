import { Component, OnInit } from '@angular/core';

import { Base64 } from '@ionic-native/base64/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AuthService } from '../services/auth.service';
import { Card, card_type } from './models/card';
import { User } from './models/user';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  userData = { image:'', email: '', password: '', fullname: '' };
  user: User = new User('','','','','',null,null,'image.png');
  card: Card;
  imgPreview = 'assets/avatar.png';
  constructor(public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private alertController: AlertController,
    private services: AuthService) {}
  getPhoto() {
    let options = {
        maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        console.log(results[i]);
        this.base64.encodeFile(results[i]).then((base64File: string) => {
        this.userData.image = base64File;
        //this.user.image = base64File;
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
          name: 'card_number',
          placeholder: 'Card number',
          type: 'number'
        },
        {
          name: 'expiration_date',
          type: 'date'
        },
        {
          name: 'cvv',
          placeholder: 'CVV',
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
            this.card = new Card (card_type.credit_card, data.card_number, data.expiration_date, data.cvv, null);
            console.log(this.card);
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
        name: 'card_number',
        placeholder: 'Edinar card number',
        type: 'number'
      },
      {
        name: 'password_edinar',
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
          this.card = new Card (card_type.edinar, data.card_number,null,null, data.password_edinar);
          console.log(this.card);
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
register(){
  this.services.register(this.user, this.card).subscribe(
    data => {
      alert(data);
    }
  );
  console.log(this.user);
  console.log(this.card);
}
getToken(){
  console.log(this.services.token);
}
  ngOnInit() {
  }

}
