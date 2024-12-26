Sub FormatoJSaTabla()
    Dim Rango As Range
    Dim ColorBorde As Long
    Dim Borde As Variant

    ' Establecer el color del borde
    ColorBorde = RGB(142, 169, 219) ' Color #8EA9DB

    ' Establecer el rango seleccionado
    Set Rango = Selection

    ' Aplicar formato al rango seleccionado
    With Rango
        ' Eliminar bordes diagonales
        .Borders(xlDiagonalDown).LineStyle = xlNone
        .Borders(xlDiagonalUp).LineStyle = xlNone
        
        ' Lista de bordes exteriores
        Dim BordesExteriores As Variant
        BordesExteriores = Array(xlEdgeLeft, xlEdgeTop, xlEdgeBottom, xlEdgeRight)
        
        ' Aplicar formato a todos los bordes exteriores
        For Each Borde In BordesExteriores
            With .Borders(Borde)
                .LineStyle = xlContinuous
                .Color = ColorBorde
                .Weight = xlThin
            End With
        Next Borde
        
        ' Bordes interiores
        .Borders(xlInsideVertical).LineStyle = xlNone
        With .Borders(xlInsideHorizontal)
            .LineStyle = xlContinuous
            .Color = ColorBorde
            .Weight = xlThin
        End With

        ' Formato de celdas específicas (primeras filas)
        With .Rows(1)
            .Interior.Pattern = xlSolid
            .Interior.PatternColorIndex = xlAutomatic
            .Interior.Color = RGB(32, 55, 100)
            .Font.Color = RGB(255, 255, 255) ' Color de Fuente Negro
        End With
    End With
End Sub

Sub InsertarLinkDesdeCarpetaConSeleccionExtencion()
        Dim Carpeta As String
        Dim Celda As Range
        Dim RutaCompleta As String
        Dim NombreArchivo As String
        Dim Extensiones As Variant
        Dim i As Integer
        Dim ArchivosEncontrados As Collection
        Dim ExtensionesEncontradas As Collection
        Dim ArchivoSeleccionado As String
        Dim ArchivoRuta As Variant
        Dim ArchivoIndex As Integer

        ' Pedir la dirección de la carpeta
        With Application.FileDialog(msoFileDialogFolderPicker)
            .Title = "Seleccionar carpeta que contiene los archivos"
            .Show
            If .SelectedItems.Count = 0 Then Exit Sub ' Si no se selecciona carpeta, salir de la macro
            Carpeta = .SelectedItems(1)
        End With

        ' Verificar si la carpeta seleccionada es válida
        If Dir(Carpeta, vbDirectory) = "" Then
            MsgBox "La carpeta seleccionada no es válida o no existe.", vbExclamation
            Exit Sub
        End If

        ' Definir las extensiones de archivo permitidas
        Extensiones = Array("*.xlsx", "*.xls", "*.csv", "*.txt", "*.pdf", "*.docx", "*.pptx", "*.jpg", "*.png") ' Agrega más extensiones según necesites

        ' Iterar a través de cada celda seleccionada
        For Each Celda In Selection
            NombreArchivo = Celda.Value
            Set ArchivosEncontrados = New Collection
            Set ExtensionesEncontradas = New Collection

            ' Buscar el archivo con cualquiera de las extensiones permitidas
            For i = LBound(Extensiones) To UBound(Extensiones)
                RutaCompleta = Carpeta & "\" & NombreArchivo & Mid(Extensiones(i), 2)
                If Dir(RutaCompleta) <> "" Then
                    ArchivosEncontrados.Add RutaCompleta
                    ExtensionesEncontradas.Add Mid(Extensiones(i), 2)
                End If
            Next i

            ' Si no se encuentra ningún archivo, mostrar mensaje y omitir la celda
            If ArchivosEncontrados.Count = 0 Then
                MsgBox "El archivo '" & NombreArchivo & "' no se encontró en la carpeta con las extensiones permitidas.", vbExclamation
                GoTo SiguienteCelda
            End If

            ' Si se encuentra solo un archivo, asignar la ruta correctamente
            If ArchivosEncontrados.Count = 1 Then
                ArchivoSeleccionado = ArchivosEncontrados(1)
                RutaCompleta = ArchivoSeleccionado
            End If

            ' Si se encuentran múltiples archivos, permitir la selección de extensión
            If ArchivosEncontrados.Count > 1 Then
                Dim ExtensionesList As String
                For i = 1 To ExtensionesEncontradas.Count
                    ExtensionesList = ExtensionesList & i & ". " & ExtensionesEncontradas(i) & vbCrLf
                Next i
                ArchivoIndex = Application.InputBox("El archivo '" & NombreArchivo & "' tiene las siguientes extensiones disponibles: " & vbCrLf & ExtensionesList & vbCrLf & "Ingrese el número de la extensión deseada:", "Seleccionar extensión", Type:=1)
                If ArchivoIndex = False Or ArchivoIndex < 1 Or ArchivoIndex > ExtensionesEncontradas.Count Then
                    MsgBox "Selección no válida. Se omitirá esta celda.", vbExclamation
                    GoTo SiguienteCelda
                End If
                RutaCompleta = Carpeta & "\" & NombreArchivo & ExtensionesEncontradas(ArchivoIndex)
            End If

            ' Convertir la ruta a formato URI
            Dim UriRutaCompleta As String
            UriRutaCompleta = "file:///" & Replace(RutaCompleta, "\", "/")

            ' Insertar el hipervínculo
            ActiveSheet.Hyperlinks.Add Anchor:=Celda, Address:=UriRutaCompleta, TextToDisplay:=Celda.Value
            
    SiguienteCelda:
        Next Celda
End Sub

Sub InsertarLink()
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