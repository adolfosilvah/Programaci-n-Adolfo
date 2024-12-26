Parte 1  crear pestañas de herramientas favoritos.
Parte 2 insertar boton personalizado. 

```vb
Sub InsertarLink(control As IRibbonControl)
Dim Separador As String
Dim RutaCompleta As String
Dim Descripcion As String
'
Separador = Application.International(xlListSeparator)
'
    With Application.FileDialog(msoFileDialogOpen)
        .InitialFileName = Application.DefaultFilePath & "  "
        .Title = "EXCELeINFO - Seleccionar archivo para hipervínculo"
        .Filters.Clear
        .Filters.Add "All files", "*.*"
        .InitialView = msoFileDialogViewDetails
        .Show
        If .SelectedItems.Count = 0 Then
        Else
            RutaCompleta = .SelectedItems(1)
            Descripcion = InputBox("Nombre descriptivo del hipervínculo.", "Insertar hipervínculo", "")
            If Descripcion = "" Then Descripcion = RutaCompleta
            ActiveCell.Formula = "=HYPERLINK(""" & RutaCompleta & " """ & Separador & """" & Descripcion & """)"
        End If
    End With
End Sub
```
Esto es un texto que no se que hace la verdad

//esto tambien//
Señores,
Se presenta el siguiente GV para su revisión y aprobación.
@Jhosele Sarabia @Javier Hinojosa @Esteban Martin
GERENCIAMIENTO DE VIAJE
Fecha: 19/12/2024
Departamento/Línea: Wireline
Motivo del viaje: Operaciones de Wireline
Lugar de salida: Maturin
Lugar Destino: El Tigre
Hora de salida: 06:00 hrs
Hora de llegada: 09:00 hrs
Unidad / Placa:
> 1- Fortuner AA179EI
Conductor/es:
> 1- Adolfo Silva
Acompañantes:
> 1- Ninguno
Ninguno
RUTA:
Maturin - El Furrial - Punta de Mata - Santa Barbara - Aguasay - San Tome - San Jose de Guanipa
PARADAS PROGRAMADAS:
Ninguna
EVALUACIÓN DE RIESGO
Kilometraje recorrido: 5 pts
> Menos de 50km   1 pts
> Menos de 100km 2 pts
> Menos de 200km ✅ 5 pts
> Más de 200km 8 pts
Condiciones Climáticas: 1 pts
> Seco  ✅ 1 pts
> Viento 2 pts
> Lluvia 4 pts
> Neblina 8 pts
Vehículos más pasajeros: 6 pts
> 2 o más Veh con 2 o más pasajeros 1 pts
> 2 o más Veh con 1 pasajero por Veh   2 pts
> 1 Veh con 2 o más personas 3 pts
> 1 Veh con 1 persona  ✅ 6 pts
Condiciones de las vías: 1 pts
> Pavimentada ✅  1 pts
> Mixta 2 pts
> No pavimentada 4 pts
Comunicación disponible: 0 pts
> Teléfono celular / Equipo radial ✅ 0 pts
> Sin comunicación en Convoy 2 pts
> Sin comunicación sin Convoy 4 pts
Horas trabajadas más tiempo de viaje: 1 pts
> Horas trabajadas + horas de viaje <12   ✅1 pts
> Horas trabajadas + horas de viaje <14 3 pts
> Horas trabajadas + horas de viaje <16 6 pts
> Trabajo más viaje > 16 horas. No está permitido conducir.
Riesgo seguridad física del viaje: 5 pts
> Alto ✅ 5 pts
> Medio 2 pts
> Bajo 1 pts
Horas del viaje (Diurna o Nocturna): 1 pts
> Diurno entre 5:00 y 18:00 _✅ 1 pts
> Nocturno entre 18:00 y 5:00 ___ 8 pts
PUNTOS: 20 pts
NIVEL DE APROBACIÓN:
> Entre 1 y 14 puntos: Coordinador / Gerente de Línea / Gerente de Guardia
> Entre 15 y 21 puntos: Gerente de Línea / Gerente General
> Entre 22 y 27 puntos: Gerente General
> Mayor a 28 puntos: No permitido