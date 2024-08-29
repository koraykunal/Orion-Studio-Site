from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import home, ecom, personal, corporation, aboutus, singlePage, req_form, contact

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('ecom/', ecom, name='ecom'),
    path('personal/', personal, name='personal'),
    path('corporation/', corporation, name='corporation'),
    path('single-page/', singlePage, name='single-page'),
    path('about/', aboutus, name='about-us'),
    path('request/', req_form, name='request'),
    path('contact/', contact, name='contact'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
