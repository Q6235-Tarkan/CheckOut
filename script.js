// Ürün satırındaki artı düğmesine tıkladığımda, ürün miktarını artırabiliyorum.
// Ürün satırındaki eksi düğmesine tıkladığımda, ürün miktarını azaltabiliyorum, ancak minimum miktar değeri 1 olmalı.
// Ürün satırındaki kaldır düğmesine tıkladığımda veya miktarı 0'a düşürdüğümde, sepetimden bir ürünü silebiliyorum.
// Herhangi bir ürünün kombinasyonunu değiştirdiğimde (artı, eksi, kaldır vb.), ilgili alanlarda yeni fiyat hesaplamasını görmek istiyorum.

guncelle();
const main_product = document.querySelector(".main__product-painel");

main_product.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("fa-plus")) {
    e.target.previousElementSibling.innerText++;
    hesaplamalar(e.target);
    guncelle();
  } else if (e.target.classList.contains("fa-minus")) {
    if (e.target.nextElementSibling.innerText > 1) {
      e.target.nextElementSibling.innerText--;
      hesaplamalar(e.target);
      guncelle();
    } else if ((e.target.nextElementSibling.innerText = 1)) {
      confirm("Bu ürünü silmek istiyor musunuz?") &&
        e.target.closest(".main__product").remove();

      hesaplamalar(e.target);
      guncelle();
    }
  } else if (e.target.classList.contains("fa-trash-can")) {
    e.target.closest(".main__product").remove();
    hesaplamalar(e.target);
    guncelle();
  }
});

function hesaplamalar(element) {
  if (element.classList.contains("fa-plus")) {
    const miktar = Number(element.previousElementSibling.innerText);
    const fiyat = Number(
      element
        .closest(".main__product-info")
        .querySelector(".main__product-price")
        .querySelector(".dollar").textContent
    );
    const total = miktar * fiyat;
    element
      .closest(".main__product-info")
      .querySelector(".main__product-line-price").innerText = total.toFixed(2);
  } else if (element.classList.contains("fa-minus")) {
    const miktar = Number(element.nextElementSibling.innerText);
    const fiyat = Number(
      element
        .closest(".main__product-info")
        .querySelector(".main__product-price")
        .querySelector(".dollar").textContent
    );
    const total = miktar * fiyat;
    element
      .closest(".main__product-info")
      .querySelector(".main__product-line-price").innerText = total.toFixed(2);
  }
}
function guncelle() {
  let genel_toplam = 0;
  document.querySelectorAll(".main__product-line-price").forEach((elemnt) => {
    let a = Number(elemnt.innerText);

    genel_toplam += a;

    document.querySelector(".main__sum-price").innerText =
      genel_toplam.toFixed(2);

    console.log(!document.querySelectorAll(".main__product"));
  });

  if (genel_toplam == 0) {
    document.querySelector(".main__sum-price").innerText = 0;
    temiz_sayfa();
  }
  if (genel_toplam >= 3000 || genel_toplam == 0) {
    document.querySelector(".shipping").innerText = 0;
  } else {
    document.querySelector(".shipping").innerText = 25.99;
  }
  document.getElementById("tax").innerText = (genel_toplam * 0.18).toFixed(2);
  const tax = document.getElementById("tax").innerText;
  document.getElementById("total").innerText = (
    Number(genel_toplam) +
    Number(tax) +
    Number(document.querySelector(".shipping").innerText)
  ).toFixed(2);
}

const alldelete = document.getElementById("all_delete");
alldelete.addEventListener("click", () => {
  confirm("Tüm ürünleri silmek istiyor musunuz?") &&
    document.querySelectorAll(".main__product").forEach((v) => {
      v.remove();
    });
  temiz_sayfa();
});

function temiz_sayfa() {
  const mainsayfa = document.getElementById("products-preview");
  mainsayfa.innerHTML += `<div class="NoProduct"><p>No Product</p></div>`;
  const totaldefoult=document.querySelector(".main__sum-price");
  totaldefoult.innerText=0;
  document.getElementById("tax").innerText=0;
  document.querySelector(".shipping").innerText=0;
  document.getElementById("total").innerText =0;
}
