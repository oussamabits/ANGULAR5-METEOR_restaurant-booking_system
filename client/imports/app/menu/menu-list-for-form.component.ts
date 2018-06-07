import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Menus } from '../../../../both/collections/menu.collection';
import { Menu } from '../../../../both/models/menu.model';

import template from './menu-list-for-form.component.html';
import {Roles} from "meteor/alanning:roles";
import {CarouselOptions} from "ng2-owl-carousel2";

@Component({
    selector: 'menus-list-for-form',
    template
})
export class MenusListForFormComponent implements AfterViewInit{
    menus: Observable<Menu[]>;
    @Output() messageEvent = new EventEmitter<string>();
    selectedItem:string;
    selected:boolean[]=[];
    previous:number;



    onItemSelect(carouselItem:any):void{
        //this carousel item can be used anywhere
    }
    clk(i,j){

        this.selectedItem = i;
        this.messageEvent.emit(this.selectedItem)
       
        this.selected[j] = true;
        if(this.previous){this.selected[this.previous]=false}
        this.previous=j;
    }

    constructor() {
        this.menus = Menus.find({}).zone();
        this.menus.forEach((p) =>{ return this.selected.push(false)});

    }

    removeParty(menu: Menu): void {
        Menus.remove(menu._id);
    }
    clickMethod(name: string,menu:Menu) {
        if (this.isAdmin()){
            if(confirm("Are you sure to delete menu "+name)) {
                this.removeParty(menu);
            }}
    }

    isAdmin(){
        return Roles.userIsInRole(Meteor.userId(),'admin');
    }

}
