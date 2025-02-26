import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../../service/server.service';
import { ToastController,NavController,Platform,LoadingController,Events } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  phone = "";
  password = "";
  
  constructor(private route: ActivatedRoute,public server : ServerService,public toastController: ToastController,private nav: NavController,public loadingController: LoadingController,public events: Events){


  }

  ngOnInit()
  {
  
  }

  async login(data)
  {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.server.login(data).subscribe((response:any) => {
  
    if(response.msg != "done")
    {
      this.presentToast(response.msg);
    }
    else
    {
      localStorage.setItem('user_id',response.user_id);
      
      this.events.publish('user_login', response.user_id);

      if(localStorage.getItem('cart_no'))
      {
        this.nav.navigateBack('home');  
      }
      else
      {
        this.nav.navigateRoot('home');  
      }
    }

    loading.dismiss();

    });
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position : 'top',
      mode:'ios',
      color:'dark'
    });
    toast.present();
  }
}
