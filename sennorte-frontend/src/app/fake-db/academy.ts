export class AcademyFakeDb {
    public static courses = [
        {
            'id': '154588a0864d2881124',
            'title': 'Módulo de fórmula médica',
            'slug': 'modulo-formula',
            'category': 'modulo',
            'length': 60,
            'updated': 'Nov 01, 2018'
        },
        {
            'id': '15453ba60d3baa5daaf',
            'title': 'Android N: Quick Settings',
            'slug': 'android-n-quick-settings',
            'category': 'utilizacion',
            'length': 120,
            'updated': 'Jun 28, 2018'
        }
    ];

    public static categories = [
        {
            'id': 0,
            'value': 'modulo',
            'label': 'Módulo'
        },
        {
            'id': 1,
            'value': 'utilizacion',
            'label': 'Utilización'
        },
        {
            'id': 2,
            'value': 'autenticacion',
            'label': 'Autenticación de usuario'
        },
        {
            'id': 3,
            'value': 'errores',
            'label': 'Errores'
        }
    ];

    private static demoSteps = [
        {
            'title': 'Introduction',
            'content': '<h1>Step 1 - Introduction</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'Get the sample code',
            'content': '<h1>Step 2 - Get the sample code</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'Create a Firebase project and Set up your app',
            'content': '<h1>Step 3 - Create a Firebase project and Set up your app</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'Install the Firebase Command Line Interface',
            'content': '<h1>Step 4 - Install the Firebase Command Line Interface</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'Deploy and run the instalacion app',
            'content': '<h1>Step 5 - Deploy and run the instalacion app</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'The Functions Directory',
            'content': '<h1>Step 6 - The Functions Directory</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'Import the Cloud Functions and Firebase Admin modules',
            'content': '<h1>Step 7 - Import the Cloud Functions and Firebase Admin modules</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'Welcome New Users',
            'content': '<h1>Step 8 - Welcome New Users</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'Images moderation',
            'content': '<h1>Step 9 - Images moderation</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'New Message Notifications',
            'content': '<h1>Step 10 - New Message Notifications</h1>' +
                '<br>' +
                'This is an example step of the course. You can put anything in here from example codes to videos.' +
                '<br><br>' +
                'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
                'To install or upgrade the CLI run the following <b>npm</b> command:' +
                '<br><br>' +
                '<code>npm -g install @angular/cli</code>' +
                '<br><br>' +
                'To verify that the CLI has been installed correctly, open a console and run:' +
                '<br><br>' +
                '<code>ng version</code>' +
                '<br><br>' +
                '<h2>Install dependencies</h2>' +
                '<br>' +
                'To moderate the images we\'ll need a few Node.js packages:' +
                '<br><br>' +
                '<ul>' +
                '<li>' +
                'The Google Cloud Vision Client Library for Node.js: @google-autenticacion/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'The Google Cloud Storage Client Library for Node.js: @google-autenticacion/storage to download and upload the images from Cloud Storage.' +
                '</li>' +
                '<br>' +
                '<li>' +
                'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
                '</li>' +
                '</ul>' +
                '<br>' +
                'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
                '<br><br>' +
                '<code>npm install --save @google-autenticacion/vision @google-autenticacion/storage child-process-promise</code>' +
                '<br><br>' +
                'This will install the three packages locally and add them as declared dependencies in your package.js file.'
        },
        {
            'title': 'Congratulations!',
            'content': '<h1>Step 11 - Congratulations!</h1>' +
                '<br>' +
                'You\'ve built a full-fidelity, offline-capable progressive instalacion app by leveraging the power of reusable Web Components and Firebase. Why bother with a native app when you know how to do all that?!'
        }
    ];

    private static guardarFormula = [
        {
            'title': '¿Qué es el módulo de fórmula médica?',
            'content': `<h1>¿Qué es el módulo de fórmula médica?</h1>
            <p>El módulo de fórmula médica tiene como función guardar las diferentes fórmulas medicas de los residentes del hogar geriatrico, 
            haciendo que dentro del hogar haya una mejor gestión de la información especifica del residente.</p>
            <p>En el camino de este curso se te enseñara la manera correcta de como funcionan cada una de sus caracteristicas y que hace cada uno de los 
            componentes que se visualizan en pantalla.</p>
            <p>Presiona el botón azul ubicado en la parte inferior derecha de esta pagina para ir al siguiente paso.</p>
            `
        },
        {
            'title': 'Entrar a la interfaz',
            'content': '<h1>Entrar a la interfaz</h1>' +
                '<br>' +
                'En el menú lateral, donde se listan todos los modúlos presionar el clic izquierdo del ratón sobre el botón <br> <code>Fórmula médica</code> ' +
                '<br><br><div align="center">' +
                '<img style="margin: 0 auto" src="assets/images/software/formula/menu-formula.png">' +
                '</div>'
        },
        {
            'title': 'Tabla de contenido',
            'content': '<h1>Tabla de contenido</h1>' +
                '<br>' +
                'En este lugar se te mostraran todas las fórmulas médicas registradas dentro del sistema, junto con información básica de cada una de las fórmulas.' +
                'Las columnas que se mostraran en la tabla seran: ' +
                '<ul>' +
                '<li><code>Referencia de la fórmula</code></li>' +
                '<li><code>Nombre del residente</code></li>' +
                '<li><code>Fecha de la fórmula</code></li>' +
                '<li><code>Medicamentos asociados a la fórmula médica</code></li>' +
                '</ul>' +
                '<img class="border-img" src="assets/images/software/formula/tabla-formula.png">'
        },
        {
            'title': 'Acciones',
            'content': '<h1>Acciones</h1>' +
                '<br>' +
                'Este módulo cuenta con tres acciones básicas, las cuales son <code>Registrar fórmula medica</code>, <code>Visualizar fórmula</code> y el <code>Buscador</code>' +
                '<br><br><img class="border-img" src="assets/images/software/formula/acciones-formula.png">'
        },
        {
            'title': 'Registrar fórmula médica',
            'content': ` <h1>Registrar fórmula médica</h1>
                <br>
                Apartir de este momento como la forma en que funciona el formulario de registro de este módulo, inicialmente se debera presionar 
                el clic izquierdo del ratón/mouse en el botón de registrar fórmula 
                <br><br>
                <img class="border-img" style="margin: 0 auto" src="assets/images/software/formula/boton-registro-formula.png">    
                <br><br>
                Luego de esto se nos abrirá la siguiente ventana:
                <br><br>
                <img class="border-img" style="margin: 0 auto" src="assets/images/software/formula/formulario-previo-registro-formula.png">
                <br><br>
                En la cual se podran ver 5 campos iniciales, los cuales son:
                <ul>
                    <li><code>Documento del residente:</code>&nbsp;En este campo se debe digitar el documento de un residente registrado previamente, 
                    de lo contrario no se realizara un registro correcto de la fórmula</li>
                    <li><code>Referencia de fórmula médica:</code>&nbsp;En este campo se debe digitar el número de referencia que viene impreso 
                    en la fórmula médica</li>
                    <li><code>IPS:</code>&nbsp;En este campo se debe digitar el nombre del hospital o la IPS de la cual fue remitida la fórmula médica</li>
                    <li><code>Fecha de la fórmula:</code>&nbsp;En este campo se debe seleccionar la fecha en la que fue remitida la formula, teniendo en cuenta que
                    no pueden ser ingresadas fechas mayores a la del dia actual</li>
                    <li><code>Medico remitente:</code>&nbsp;En este campo se debera digitar el médico que remitio la fórmula medica</li>
                </ul>
                
            `
        },
        {
            'title': 'Buscador de fórmula y filtros de búsqueda',
            'content': '<h1>Buscador de fórmula y filtros de búsqueda</h1>' +
                '<br>' +
                'El buscador de fórmulas es una herramienta que esta integrada a la tabla, en el cual se puede buscar por cualquier parametro dentro de la tabla, ' +
                'ya sea por <b>nombre del residente</b>, <b>referencia</b> ó <b>fecha</b>, los parametros que se ingresen se actualizaran en ' +
                'tiempo real, como se ve en el ejemplo: <br><br>' +
                '<video class="w-100-p" controls src="assets/images/software/formula/actualizacion-tabla-formula.mp4"></video>'
        },
        {
            'title': 'Felicitaciones!',
            'content': '<h1>Haz terminado</h1>' +
                '<br>' +
                'Haz terminado el modúlo de <b>Registro de fórmula médica</b> con exito!'
        }
    ];

    public static course = [
        {
            'id': '154588a0864d2881124',
            'title': 'Módulo de fórmula médica',
            'slug': 'registrar-formula',
            'description': 'Dentro de este curso aprenderas como funciona el módulo de fórmula medica de manera correcta',
            'category': 'modulo',
            'length': 15,
            'totalSteps': 10,
            'updated': 'Nov 01, 2018',
            'steps': AcademyFakeDb.guardarFormula
        },
        {
            'id': '15453ba60d3baa5daaf',
            'title': 'Registrar residente',
            'slug': 'registrar-residente',
            'description': 'Pasos a seguir para un correcto registro de un nuevo residente',
            'category': 'utilizacion',
            'length': 120,
            'totalSteps': 11,
            'updated': 'Jun 28, 2018',
            'steps': AcademyFakeDb.demoSteps
        }
    ];

}
