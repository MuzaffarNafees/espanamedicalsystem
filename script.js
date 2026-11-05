const themeLink=document.createElement('link');
themeLink.rel='stylesheet';
themeLink.href='theme.css';
document.head.appendChild(themeLink);

document.querySelectorAll('.brand span:last-child').forEach((brand)=>{
  brand.textContent='Espana Medical System';
});

document.addEventListener('DOMContentLoaded',()=>{
  const form=document.querySelector('#enquiry-form');
  if(!form)return;

  form.action='https://formsubmit.co/ajax/majidchaudhary123@gmail.com';
  form.method='POST';
  form.noValidate=true;

  const status=form.querySelector('.form-status');
  const fields={
    name:form.elements.name,
    email:form.elements.email,
    service:form.elements.service,
    message:form.elements.message
  };
  let submitted=false;

  Object.entries(fields).forEach(([name,field])=>{
    const error=document.createElement('span');
    error.className='field-error';
    error.id=`${name}-error`;
    error.setAttribute('aria-live','polite');
    field.insertAdjacentElement('afterend',error);
    field.setAttribute('aria-describedby',error.id);

    const validate=()=>{
      const value=field.value.trim();
      let message='';

      if(name==='name'&&value.length<2)message='Please enter your full name (at least 2 characters).';
      if(name==='email'&&!/^\S+@\S+\.\S+$/.test(value))message='Please enter a valid work email address.';
      if(name==='service'&&!value)message='Please select a service.';
      if(name==='message'&&value.length<20)message='Please provide at least 20 characters about your requirement.';

      error.textContent=message;
      field.setAttribute('aria-invalid',String(Boolean(message)));
      field.closest('label').classList.toggle('has-error',Boolean(message));
      return !message;
    };

    field.addEventListener(name==='service'?'change':'input',()=>{
      if(submitted||field.getAttribute('aria-invalid')==='true')validate();
    });
    field.addEventListener('blur',()=>{
      if(submitted)validate();
    });
    field.validate=validate;
  });

  form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    event.stopImmediatePropagation();
    submitted=true;

    const invalidFields=Object.values(fields).filter((field)=>!field.validate());
    if(invalidFields.length){
      status.textContent='';
      status.className='form-status';
      invalidFields[0].focus();
      return;
    }

    const name=fields.name.value.trim();
    const email=fields.email.value.trim();
    const service=fields.service.value;
    const message=fields.message.value.trim();
    status.textContent='Sending your enquiry...';
    status.className='form-status is-sending';

    try{
      const response=await fetch(form.action,{
        method:'POST',
        headers:{Accept:'application/json','Content-Type':'application/json'},
        body:JSON.stringify({
          name,
          email,
          organisation:form.elements.organisation.value.trim(),
          service,
          message,
          _subject:'New Espana Medical System enquiry',
          _captcha:'false'
        })
      });
      if(!response.ok)throw new Error('Request failed');
      form.reset();
      Object.values(fields).forEach((field)=>{
        field.setAttribute('aria-invalid','false');
        field.closest('label').classList.remove('has-error');
        field.nextElementSibling.textContent='';
      });
      submitted=false;
      status.textContent='Thank you. Your enquiry has been sent to Espana Medical System.';
      status.className='form-status is-success';
    }catch(error){
      status.textContent='We could not send your enquiry right now. Please try again.';
      status.className='form-status is-error';
    }
  },{capture:true});
});
document.addEventListener('DOMContentLoaded',()=>{const p=document.querySelector('.scroll-progress'),t=document.querySelector('.nav-toggle'),m=document.querySelector('.nav-menu');const update=()=>{const h=document.documentElement.scrollHeight-innerHeight;if(p)p.style.width=`${h?(scrollY/h)*100:0}%`};update();addEventListener('scroll',update,{passive:true});t?.addEventListener('click',()=>{const open=m.classList.toggle('is-open');t.setAttribute('aria-expanded',String(open))});document.querySelectorAll('.nav-menu a').forEach(a=>a.addEventListener('click',()=>{m?.classList.remove('is-open');t?.setAttribute('aria-expanded','false')}));document.addEventListener('click',e=>{if(m&&t&&!m.contains(e.target)&&!t.contains(e.target)){m.classList.remove('is-open');t.setAttribute('aria-expanded','false')}});const items=document.querySelectorAll('.reveal');if('IntersectionObserver'in window){const o=new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.12});items.forEach(i=>o.observe(i))}else items.forEach(i=>i.classList.add('is-visible'))});