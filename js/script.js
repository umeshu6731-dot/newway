
document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector(".menu-btn"), nav=document.querySelector(".nav-links");
  if(menu && nav) {
    menu.addEventListener("click",()=>{
      const isOpen=nav.classList.toggle("open");
      menu.setAttribute("aria-expanded",String(isOpen));
      menu.setAttribute("aria-label",isOpen ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
      nav.classList.remove("open");
      menu.setAttribute("aria-expanded","false");
      menu.setAttribute("aria-label","Open menu");
    }));
  }
  const form=document.getElementById("enquiryForm");
  if(form) form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const submitter = e.submitter || document.activeElement;
    const action = submitter && submitter.dataset && submitter.dataset.action ? submitter.dataset.action : "whatsapp";
    const n=document.getElementById("name").value.trim();
    const p=document.getElementById("phone").value.trim();
    const em=document.getElementById("email").value.trim();
    const s=document.getElementById("service").value;
    const m=document.getElementById("message").value.trim();
    const text=["New Website Enquiry","",`Name: ${n}`,`Phone: ${p}`,`Email: ${em||"Not provided"}`,`Service: ${s}`,`Requirement: ${m}`].join("\n");

    if(action === "email") {
      const subject = encodeURIComponent(`New enquiry from ${n || 'website visitor'}`);
      const body = encodeURIComponent(text);
      const mailtoUrl=`mailto:newwayenterprises26@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoUrl;
      return;
    }

    const whatsappUrl=`https://wa.me/918310563609?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl,"_blank","noopener,noreferrer");
  });
});
