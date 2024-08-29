from django import forms


class RequestForm(forms.Form):
    first_name = forms.CharField(label='İsim', max_length=100)
    last_name = forms.CharField(label='Soyisim', max_length=100)
    phone = forms.CharField(label='Telefon', max_length=15)
    email = forms.EmailField(label='Email')
    company = forms.CharField(label='Şirket İsmi', max_length=100, required=False)
    request_message = forms.CharField(label='Talep', widget=forms.Textarea)


class ContactForm(forms.Form):
    full_name = forms.CharField(label='İsim', max_length=100)
    phone = forms.CharField(label='Telefon', max_length=15)
    email = forms.EmailField(label='Email')
    message = forms.CharField(label='Mesaj', widget=forms.Textarea)
