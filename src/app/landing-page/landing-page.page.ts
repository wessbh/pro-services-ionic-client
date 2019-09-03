import { Component, OnInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Domaine } from '../models/domaine';
import { Category } from '../models/category';
import { DomainesService } from '../services/domaines.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {
  doms: any;
  domaines_array = [];
  categories_array: any;
  imgPreview = 'assets/avatar.png';
  constructor(
    private domaineServices: DomainesService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getDomaines();
  }
  getDomaines() {

    return this.domaineServices.getDomaines().subscribe(
      data => {
        this.doms = data;
        var categories = [];
        // this.doms.forEach(d => {
        //   var domaine = new Domaine(d._id, d.libelle, d.image);
        //   categories = this.doms[1].categories;
        //   categories.forEach(c => {
        //     var category = new Category(c._id, domaine.id, c.libelle, c.image);
        //     domaine.categories.push(category);
        //   });
        //   this.domaines_array.push(domaine);
        // });

        for (let i = 0; i < this.doms.length; i++) {
          var domaine = new Domaine(this.doms[i]._id, this.doms[i].libelle, this.doms[i].image);
          categories = this.doms[i].categories;
          categories.forEach(c => {
            var category = new Category(c._id, domaine.id, c.libelle, c.image);
            domaine.categories.push(category);
          });
          this.domaines_array.push(domaine);
        }

        console.log(this.domaines_array);
      }
    )
  }
  getCategories(libelle_domaine: string) {
    var categories = [];
    this.domaines_array.forEach(domaine => {
      if (domaine.libelle == libelle_domaine) {
        for (let i = 0; i < domaine.categories.length; i++) {
          var cat = domaine.categories[i];
          categories.push(cat);
        }
      }
    });
    return categories;

  }
}
