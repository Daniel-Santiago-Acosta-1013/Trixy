# Trixy

Descripción reservada...

## Comenzando

1.  Clone el repositorio:

```
git clone git@github.com:Daniel-Santiago-Acosta-1013/Trixy.git
```

1.  Instale las dependencias usando yarn:

```
npm i -S
```

1.  Para ejecutar la aplicación en modo de desarrollo, utilice:

```
npx expo start --tunnel
```

1.  Para construir la aplicación para Android en modo de vista previa, use:

```
eas build -p android --profile preview
```

## Construcción para Producción

Para construir la aplicación para producción en Android o iOS, utilice el siguiente comando:

### Android:

```
eas build -p android
```

### iOS:

```
eas build -p ios
```

## Enviar a la tienda

Después de construir la aplicación, puedes enviarla a la tienda correspondiente.

### Android:

```
eas submit -p android
```

### iOS:

```
eas submit -p ios
```

## Dependencias

Es posible que necesite instalar algunas dependencias específicas para el proyecto, como dependecia. Puede hacerlo con:

```
expo install dependecia
```
