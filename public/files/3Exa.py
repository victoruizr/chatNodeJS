"""cont_1 = cont_2 = 0
valores = ['hola',1,0,2]
for val in valores:
    try:
        d = float(val)
        x = 1 / d
    except ValueError:
        print('Error al convertir {0} a numero'.format(val))
    except ZeroDivisionError:
        print('Divisor no puede ser Cero')
    else:
        print('1/{0}={1}'.format(d, x))
        cont_2 += 1
    finally:
        cont_1 += 1
        print( cont_1, cont_2 )"""

"""
def carga_contactos(fichero):
    file = open(fichero)  
    diccionario = {}
    array = []
    linea = file.readlines()
    for x in linea:
        palabra = (x.rstrip("\n"))
        array.append(palabra.split(" "))
    for caracteres in array:
        diccionario[caracteres[0]]=caracteres[1]

    print(diccionario)"""

class CalificacionError(ValueError):
    pass

class Calificacion:
    def __init__(self, valor):
        self.valor=valor
        try:
            if self.valor<0 or self.valor>10:
                raise CalificacionError(ValueError)
        except CalificacionError:
            print("Nota {0} incorrecta".format(self.valor))


class Media(Calificacion):
    def __init__(self, lista):
        self.lista=lista
        self.nota=0
        for x in self.lista:
           self.nota+= x.valor
        self.valor = self.nota/(len(self.lista))
      
    
def atributo(objeto):
    return [x for x in dir(objeto) if not x.startswith("__")]




                    
