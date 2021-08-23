import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NodeMask } from '../../../Utils';
import { FilterOptions, PulseiraDTO } from '../../../Models';
import { PulseiraStatusEnum, PulseiraStatusLabelsEnum } from '../../../Enumns';
import { PulseiraService } from '../../../Services';

@Component({
  selector: 'app-pulseira-form',
  templateUrl: './pulseira-form.component.html',
  styleUrls: ['./pulseira-form.component.scss']
})
export class PulseiraFormComponent implements OnInit, AfterViewInit {

  NodeMask = NodeMask;
  statusOptions: FilterOptions[] = [];
  disableButton: boolean = false;
  pulseiraId: number|null;
  title:string;

  pulseiraForm = this.fb.group({
    node: [null,[Validators.required,Validators.minLength(20)]],
    status: [null,[Validators.required]]
  })

  constructor(
    private readonly fb:FormBuilder,
    private readonly router:Router,
    private readonly pulseiraService:PulseiraService,
    private readonly route:ActivatedRoute
  ) { }

  ngOnInit() {
    Object.keys(PulseiraStatusLabelsEnum).forEach(key => {
      this.statusOptions.push({
        key: PulseiraStatusEnum[key],
        label: PulseiraStatusLabelsEnum[key]
      })
    })
  }

  async ngAfterViewInit(){
    this.pulseiraId = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : null;
    if(this.pulseiraId){
      const Pulseira = await this.pulseiraService.getPulseirasById(this.pulseiraId);
      if (Pulseira){
        this.pulseiraForm.controls.node.setValue(Pulseira.node);
        this.pulseiraForm.controls.status.setValue(Pulseira.status);
        this.pulseiraForm.controls.node.disable();
      } else {
        this.cancel();
      }
    }
    setTimeout(() => {
      this.title = this.pulseiraId ? 'Editar' : 'Criar';
    });
  }

  cancel(){
    this.router.navigate(['/home/pulseira']);
  }

  disableButtons(status: boolean){
    this.disableButton = status;
  }

  async save(){
    if(this.pulseiraForm.valid){
      this.disableButtons(true);
      const PulseiraFromForm = this.getFormAsPulseiraDTO();
      if(this.pulseiraId){
        const EditResponse = await this.pulseiraService.updatePulseira( this.pulseiraId, PulseiraFromForm);
        if(EditResponse){
          this.cancel();
        }
      }
      else{
        const CreateResponse = await this.pulseiraService.cratePulseira(PulseiraFromForm);
        if(CreateResponse){
          this.cancel();
        }
      }
      this.disableButtons(false);
    }
  }

  getFormAsPulseiraDTO():PulseiraDTO{
    const NewPulseira:PulseiraDTO = {
      node: this.pulseiraForm.controls.node.value,
      status: this.pulseiraForm.controls.status.value,
    }
    return NewPulseira;
  }
}
