from django.shortcuts import render, get_object_or_404, redirect
from django.core.mail import send_mail
from .forms import RequestForm


def home(request):
    context = {}
    return render(request, 'home.html', context)


def ecom(request):
    context = {}
    return render(request, 'services/ecommerce.html', context)


def personal(request):
    context = {}
    return render(request, 'services/personal.html', context)


def corporation(request):
    context = {}
    return render(request, 'services/corporation.html', context)


def singlePage(request):
    context = {}
    return render(request, 'services/single-page.html', context)


def aboutus(request):
    context = {}
    return render(request, 'about-us.html', context)


def req_form(request):
    if request.method == 'POST':
        form = RequestForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            phone = form.cleaned_data['phone']
            email = form.cleaned_data['email']
            company = form.cleaned_data['company']
            request_message = form.cleaned_data['request_message']

            subject = f"Yeni Talep: {first_name} {last_name}"
            message = f"İsim: {first_name}\nSoyisim: {last_name}\nTelefon: {phone}\nEposta: {email}\nŞirket: {company}\n\nTalep:\n{request_message}"
            from_email = email
            to_email = ['info@orion-studio.net']

            send_mail(subject, message, from_email, to_email)

            return render(request, 'request-success.html')
    else:
        form = RequestForm()
    return render(request, 'req-form.html', {'form': form})


def contact(request):
    if request.method == 'POST':
        form = RequestForm(request.POST)
        if form.is_valid():
            full_name = form.cleaned_data['first_name']
            phone = form.cleaned_data['phone']
            email = form.cleaned_data['email']
            contact_message = form.cleaned_data['request_message']

            subject = f"Yeni Mesaj: {full_name}"
            message = f"İsim: {full_name}\nTelefon: {phone}\nEposta: {email}\nTalep:\n{contact_message}"
            from_email = email
            to_email = ['info@orion-studio.net']

            send_mail(subject, message, from_email, to_email)

            return render(request, 'request-success.html')
    else:
        form = RequestForm()
    return render(request, 'contact.html', {'form': form})
