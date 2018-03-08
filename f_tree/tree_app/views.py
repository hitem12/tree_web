from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from django.urls import reverse
from django.views import generic
from django.http import JsonResponse

from .models import Persons, Children

# Create your views here.
'''
def index(request):
    data = Persons.objects.all()[:70]
    context = { 
    'data': data,
    }
    return render(request,'tree_app/index.html',context)
'''

class IndexView(generic.ListView):
    template_name = 'tree_app/index.html'
    queryset = Persons.objects.all()
    context_object_name = 'persons'
   # def get_queryset(self):
    #     return Persons.objects.all()
	
def tree(request, pk):
    data = Persons.objects.order_by('-surname')
    this_person = Persons.objects.filter(id = pk)
    father = Persons.objects.raw('SELECT * FROM persons WHERE id = (SELECT id_father FROM children WHERE id_children = '+str(pk)+')' )
    mother = Persons.objects.raw('SELECT * FROM persons WHERE id = (SELECT id_mother FROM children WHERE id_children = '+str(pk)+')' )
    child = Persons.objects.raw('SELECT * FROM persons WHERE id IN( SELECT id_children FROM children WHERE id_father = '+str(pk)+' OR id_mother = '+str(pk)+')')
    if [q.sex for q in this_person] == [0]:
        spouse = Persons.objects.raw('SELECT * FROM persons WHERE id IN( SELECT id_husband FROM marriage WHERE id_wife = '+str(pk)+' )')
    else:
        spouse = Persons.objects.raw('SELECT * FROM persons WHERE id IN( SELECT id_wife FROM marriage WHERE id_husband = '+str(pk)+' )')
    context = { 
    'persons': data,
    'this_person' : this_person,
    'mother' : mother,
	'father' : father,
    'spouse' : spouse,
    'child' : child,
    }
    return render(request, 'tree_app/index_2.html',context)
	

def detail(request, pk):
   # data = Persons.objects.all()
    data = Persons.objects.order_by('-surname')
    this_person = Persons.objects.filter(id = (pk+1))
    context = { 
    'persons': data,
    'this_person' : this_person,
    }
    return render(request,'tree_app/index.html',context)


def bootstrap(request, pk):
    data = Persons.objects.order_by('-surname')
    this_person = Persons.objects.filter(id = pk)
    father = Persons.objects.raw('SELECT * FROM persons WHERE id = (SELECT id_father FROM children WHERE id_children = '+str(pk)+')' )
    mother = Persons.objects.raw('SELECT * FROM persons WHERE id = (SELECT id_mother FROM children WHERE id_children = '+str(pk)+')' )
    child = Persons.objects.raw('SELECT * FROM persons WHERE id IN( SELECT id_children FROM children WHERE id_father = '+str(pk)+' OR id_mother = '+str(pk)+')')
    if [q.sex for q in this_person] == [0]:
        spouse = Persons.objects.raw('SELECT * FROM persons WHERE id IN( SELECT id_husband FROM marriage WHERE id_wife = '+str(pk)+' )')
    else:
        spouse = Persons.objects.raw('SELECT * FROM persons WHERE id IN( SELECT id_wife FROM marriage WHERE id_husband = '+str(pk)+' )')
    context = { 
    'persons': data,
    'this_person' : this_person,
    'mother' : mother,
	'father' : father,
    'spouse' : spouse,
    'child' : child,
    }
    return render(request,'tree_app/index_bootstrap.html',context)




def tree_data(request,pk):
   #person = Persons.objects.filter(id = 12)
   print('ajax wola')
   person = Persons.objects.filter(id = (pk))
   data = ''.join([q.names for q in person])+' '
   data = data.join([q.surname for q in person]) 
   return JsonResponse(data, safe = False)

'''
class DetailView(generic.DetailView):
	#queryset = Persons
	#data = Persons.objects.all()
	#context_object_name = 'data'
    #this_person = Persons.objects.filter(id = pk)
    model = Persons
    template_name = 'tree_app/index.html'

    def get_context_data(self,**kwargs):
         context = super(DetailView, self).get_context_data(**kwargs)
         context['persons'] = Persons.objects.all()
         context['this_person'] = Persons.objects.filter(id = 14)

         print(self.query_pk_and_slug)
         return context
'''



	

def vote(request, pk):
    return HttpResponse("You're voting on question %s." % pk)
