/* mock serializer, for unit testing. This file is separated from data.js
   because the stub data is huge an we don't want to ship it with the rest
   of the app */

IriSP.MockSerializer = function(DataLoader, url) {
  IriSP.Serializer.call(this, DataLoader, url);

  this._data = { "tags": [
      {
          "meta": {
            "dc:contributor": "IRI ", 
            "dc:created": "2010-09-06T15:53:44.618963", 
            "dc:title": "suffrage universel", 
            "dc:modified": "2010-09-06T15:53:44.618963", 
            "dc:creator": "IRI"
          }, 
          "id": "edaabd04-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.621828", 
            "dc:title": "Patrick Rogiers", 
            "dc:modified": "2010-09-06T15:53:44.621828", 
            "dc:creator": "IRI"
          }, 
          "id": "edab1fec-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.575615", 
            "dc:title": "Kirgistan", 
            "dc:modified": "2010-09-06T15:53:44.575615", 
            "dc:creator": "IRI"
          }, 
          "id": "eda50fb2-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.600158", 
            "dc:title": "Alphonse Baudin", 
            "dc:modified": "2010-09-06T15:53:44.600158", 
            "dc:creator": "IRI"
          }, 
          "id": "eda8ba7c-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.618963", 
            "dc:title": "mandats rétribués", 
            "dc:modified": "2010-09-06T15:53:44.618963", 
            "dc:creator": "IRI"
          }, 
          "id": "edaab0b6-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.621828", 
            "dc:title": "Belgique", 
            "dc:modified": "2010-09-06T15:53:44.621828", 
            "dc:creator": "IRI"
          }, 
          "id": "edab1808-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.609400", 
            "dc:title": "18juin", 
            "dc:modified": "2010-09-06T15:53:44.609400", 
            "dc:creator": "IRI"
          }, 
          "id": "edaa23f8-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.621828", 
            "dc:title": "Wallons", 
            "dc:modified": "2010-09-06T15:53:44.621828", 
            "dc:creator": "IRI"
          }, 
          "id": "edab2730-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.626707", 
            "dc:title": "theatre.doc", 
            "dc:modified": "2010-09-06T15:53:44.626707", 
            "dc:creator": "IRI"
          }, 
          "id": "edabd6b2-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.609400", 
            "dc:title": "marée noire", 
            "dc:modified": "2010-09-06T15:53:44.609400", 
            "dc:creator": "IRI"
          }, 
          "id": "edaa3aaa-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.621828", 
            "dc:title": "Flamands", 
            "dc:modified": "2010-09-06T15:53:44.621828", 
            "dc:creator": "IRI"
          }, 
          "id": "edab1c36-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.618963", 
            "dc:title": "Auguste Baudin", 
            "dc:modified": "2010-09-06T15:53:44.618963", 
            "dc:creator": "IRI"
          }, 
          "id": "edaaa8dc-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.575615", 
            "dc:title": "retraite", 
            "dc:modified": "2010-09-06T15:53:44.575615", 
            "dc:creator": "IRI"
          }, 
          "id": "eda7047a-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.618963", 
            "dc:title": "financement politique", 
            "dc:modified": "2010-09-06T15:53:44.618963", 
            "dc:creator": "IRI"
          }, 
          "id": "edaaad00-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.609400", 
            "dc:title": "Bloody Sunday", 
            "dc:modified": "2010-09-06T15:53:44.609400", 
            "dc:creator": "IRI"
          }, 
          "id": "edaa329e-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.621828", 
            "dc:title": "éléction", 
            "dc:modified": "2010-09-06T15:53:44.621828", 
            "dc:creator": "IRI"
          }, 
          "id": "edab2b68-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.618963", 
            "dc:title": "suffrage directs", 
            "dc:modified": "2010-09-06T15:53:44.618963", 
            "dc:creator": "IRI"
          }, 
          "id": "edaab962-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.621828", 
            "dc:title": "vuvuzela", 
            "dc:modified": "2010-09-06T15:53:44.621828", 
            "dc:creator": "IRI"
          }, 
          "id": "edab238e-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.609400", 
            "dc:title": "Domenech", 
            "dc:modified": "2010-09-06T15:53:44.609400", 
            "dc:creator": "IRI"
          }, 
          "id": "edaa36ea-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.624524", 
            "dc:title": "sociologie du sport", 
            "dc:modified": "2010-09-06T15:53:44.624524", 
            "dc:creator": "IRI"
          }, 
          "id": "edab8162-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.575615", 
            "dc:title": "Mondiale", 
            "dc:modified": "2010-09-06T15:53:44.575615", 
            "dc:creator": "IRI"
          }, 
          "id": "eda60c8c-b9ce-11df-9e63-00145ea4a2be"
        }, 
        {
          "meta": {
            "dc:contributor": "IRI", 
            "dc:created": "2010-09-06T15:53:44.618963", 
            "dc:title": "professionalisation de la politique", 
            "dc:modified": "2010-09-06T15:53:44.618963", 
            "dc:creator": "IRI"
          }, 
          "id": "edaab5c0-b9ce-11df-9e63-00145ea4a2be"
        }
      ], 
      "views": null, 
      "lists": [
        {
          "items": [
            {
              "id-ref": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560"
            }, 
            {
              "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795"
            }, 
            {
              "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831"
            }, 
            {
              "id-ref": "c_DE60F95E-73B8-922D-3AC7-6FB197A1BF16"
            }
          ], 
          "meta": {
            "dc:contributor": "undefined", 
            "dc:created": "2010-09-06T15:53:44.572185", 
            "dc:creator": "perso", 
            "id-ref": "franceculture_retourdudimanche20100620", 
            "dc:title": "Découpages personnels", 
            "editable": "false", 
            "dc:modified": "2010-09-06T15:53:44.572185", 
            "dc:description": ""
          }, 
          "id": "ens_perso"
        }
      ], 
      "medias": [
        {
          "origin": "0", 
          "http://advene.liris.cnrs.fr/ns/frame_of_reference/ms": "o=0", 
          "href": "rtmp://media.iri.centrepompidou.fr/ddc_player/video/franceculture/franceculture_retourdudimanche20100620.flv", 
          "meta": {
            "dc:contributor": "IRI", 
            "item": {
              "name": "streamer", 
              "value": "rtmp://media.iri.centrepompidou.fr/ddc_player/"
            }, 
            "dc:created": "2010-06-25T16:58:36.186952", 
            "dc:duration": 3016000, 
            "dc:creator": "IRI", 
            "dc:created.contents": "2010-06-25", 
            "dc:title": "FC Retour du dimanche 2010-06-20", 
            "dc:creator.contents": "IRI", 
            "dc:modified": "2010-06-25T16:58:36.187009", 
            "dc:description": "France Culture. Retour du dimanche 2010-06-20"
          }, 
          "id": "franceculture_retourdudimanche20100620", 
          "unit": "ms"
        }
      ], 
      "meta": {
        "dc:contributor": "admin", 
        "dc:created": "2010-07-12T00:30:40.272719", 
        "dc:creator": "admin", 
        "main_media": {
          "id-ref": "franceculture_retourdudimanche20100620"
        }, 
        "dc:description": "", 
        "dc:title": "RetourDimanche20juin_decoupageChronique", 
        "id": "ef4dcc2e-8d3b-11df-8a24-00145ea4a2be", 
        "dc:modified": "2010-08-25T11:39:25.507013"
      }, 
      "annotations": [
        {
          "begin": "0", 
          "end": 88414, 
          "tags": [
            {
              "id-ref": "eda50fb2-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "eda60c8c-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "eda7047a-b9ce-11df-9e63-00145ea4a2be"
            }
          ], 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "16776960", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "", 
            "title": "Générique"
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560", 
            "dc:created": "2010-09-06T15:53:44.572226", 
            "dc:modified": "2010-09-06T15:53:44.572226", 
            "dc:creator": "perso"
          }, 
          "id": "s_32C565F4-15F4-E7CB-EBC5-6FB51DAC635C"
        }, 
        {
          "begin": "88422", 
          "end": 169831, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "6684774", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "", 
            "title": "Sommaire"
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560", 
            "dc:created": "2010-09-06T15:53:44.572226", 
            "dc:modified": "2010-09-06T15:53:44.572226", 
            "dc:creator": "perso"
          }, 
          "id": "s_8F385150-64B3-7539-AB94-6FB51DAC40B4"
        }, 
        {
          "begin": "170235", 
          "end": 316123, 
          "tags": [
            {
              "id-ref": "eda8ba7c-b9ce-11df-9e63-00145ea4a2be"
            }
          ], 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "10027008", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "L'invité : Alain Guarrigue, sur Alphonse Baudin", 
            "title": "Présentation de l'invité - Alain Garrigou"
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560", 
            "dc:created": "2010-09-06T15:53:44.572226", 
            "dc:modified": "2010-09-06T15:53:44.572226", 
            "dc:creator": "perso"
          }, 
          "id": "s_948A7C82-DD23-8CAC-27D4-6FB51DAC7D41"
        }, 
        {
          "begin": "316720", 
          "end": 694781, 
          "tags": [
            {
              "id-ref": "edaa23f8-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edaa329e-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edaa36ea-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edaa36ea-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edaa3aaa-b9ce-11df-9e63-00145ea4a2be"
            }
          ], 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "6736896", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "", 
            "title": "Revue d'actualité - Hervé Gardette"
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560", 
            "dc:created": "2010-09-06T15:53:44.572226", 
            "dc:modified": "2010-09-06T15:53:44.572226", 
            "dc:creator": "perso"
          }, 
          "id": "s_54DB840E-01AC-D042-37E2-B2BA1E18B47C"
        }, 
        {
          "begin": "695261", 
          "end": 1772062, 
          "tags": [
            {
              "id-ref": "edaaa8dc-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edaaad00-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edaab0b6-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edaab5c0-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edaab962-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edaabd04-b9ce-11df-9e63-00145ea4a2be"
            }
          ], 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "10027008", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "", 
            "title": "Invité spécial - Alain Garrigou"
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560", 
            "dc:created": "2010-09-06T15:53:44.572226", 
            "dc:modified": "2010-09-06T15:53:44.572226", 
            "dc:creator": "perso"
          }, 
          "id": "s_BDB0677D-DBF9-D198-896B-B2BDB9012D54"
        }, 
        {
          "begin": "1772707", 
          "end": 2515173, 
          "tags": [
            {
              "id-ref": "edab1808-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edab1c36-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edab1fec-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edab238e-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edab2730-b9ce-11df-9e63-00145ea4a2be"
            }, 
            {
              "id-ref": "edab2b68-b9ce-11df-9e63-00145ea4a2be"
            }
          ], 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "6749952", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "", 
            "title": "Revue de presse - Hervé Gardette"
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560", 
            "dc:created": "2010-09-06T15:53:44.572226", 
            "dc:modified": "2010-09-06T15:53:44.572226", 
            "dc:creator": "perso"
          }, 
          "id": "s_3FC1D037-34A3-FEF7-541C-B2C31ED973A8"
        }, 
        {
          "begin": "2516091", 
          "end": 2646767, 
          "tags": [
            {
              "id-ref": "edab8162-b9ce-11df-9e63-00145ea4a2be"
            }
          ], 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "10027008", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "", 
            "title": "Le sujet de l'invité : la sociologie du sport - Alain Garrigou"
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560", 
            "dc:created": "2010-09-06T15:53:44.572226", 
            "dc:modified": "2010-09-06T15:53:44.572226", 
            "dc:creator": "perso"
          }, 
          "id": "s_82613B88-9578-DC2C-D7D0-B2C5BE0B7BDA"
        }, 
        {
          "begin": "2647012", 
          "end": 3012503, 
          "tags": [
            {
              "id-ref": "edabd6b2-b9ce-11df-9e63-00145ea4a2be"
            }
          ], 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "16776960", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "", 
            "title": "Chronique du Courrier International - Antony Bélanger"
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560", 
            "dc:created": "2010-09-06T15:53:44.572226", 
            "dc:modified": "2010-09-06T15:53:44.572226", 
            "dc:creator": "perso"
          }, 
          "id": "s_24324ACF-E8D0-46FE-E977-B2C7D1A1FBAA"
        }, 
        {
          "begin": "902235", 
          "end": 1022560, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Garrigou : financement politique, suffrage universel et direct et mandats rétribués,", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_C5118055-7575-43BD-05BA-B2B91B977B61"
        }, 
        {
          "begin": "1022560", 
          "end": 1029340, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Caroline Broué", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_224FA6AF-AC6B-5412-C882-B2B91B97A0BC"
        }, 
        {
          "begin": "1029340", 
          "end": 1123892, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Garrigou : professionalisation de la politique, promotion sociale et financière", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_99950FC3-A79B-9A08-5E90-B2B91B97C844"
        }, 
        {
          "begin": "1123892", 
          "end": 1135827, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "CBroué : mourir pour des idées", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_7DE30BA7-4E61-F41D-9EB8-B2B91B97C4C1"
        }, 
        {
          "begin": "1135827", 
          "end": 1195874, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Archives Radio : Auguste Bodin, mourrir pour 25 francs", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_C588B92E-EB4F-B383-4D50-B2B91B97B4C2"
        }, 
        {
          "begin": "1195874", 
          "end": 1215565, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "C.Broué : geste et figure du député. Emblématique.", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_87A5F46B-9588-4C02-24B6-B2B91B97037A"
        }, 
        {
          "begin": "1215565", 
          "end": 1391433, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Garrigou : mourrir pour des idées est valorisé, grandeur humaine au 19è siècle\nVictor Hugo esthétise Bodin\nSouscription de bodin ou se révèle Gambetta", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_1CF29EC2-1109-25FF-F8D7-B2B91B97944A"
        }, 
        {
          "begin": "1391433", 
          "end": 1451340, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "C.Broué : héros civique, figure disparue,\ndéfense de l'indémnité parlementaire\nl'intérete a repris le dessus sur la politique", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_B3A6C0FE-10B0-91D2-BC98-B2B91B97EC15"
        }, 
        {
          "begin": "1451340", 
          "end": 1539483, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Garrigou : humour de Bodin, \non ne meurt pas pour de l'argent, \nl'argent n'est pas une conviction,\nHéros : héros guerrier, le Saint ou martyr,", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_FE44EC82-002E-3A78-B712-B2B91B975C76"
        }, 
        {
          "begin": "1539483", 
          "end": 1547610, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "C.Broué : Degaulle figure de héros civique ?", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_943F5904-D438-F263-C8B4-B2B91B97608C"
        }, 
        {
          "begin": "1547610", 
          "end": 1659484, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Garrigou : appel à la désobéissance, résistance de Bodin et Résistance de J.Moulin\nhéros civique : personnage anonyme\nca n'est pas le soldat, ni le saint, ni le Grand Homme", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_FBB30EA9-8699-E909-62BA-B2B91B9792C6"
        }, 
        {
          "begin": "1659484", 
          "end": 1720413, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "C.Broué : autonomisation du champs politique par rapport à l'intéret économique.\nperspective contemporaine : tenter de rétablir une certaine morale publique.", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_8F2D73FD-4C22-DE0A-E22A-B2B91B97CA92"
        }, 
        {
          "begin": "1720413", 
          "end": 1773308, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Garrigou : société post-héroique : la politique est une question économique\nsociété d'irresponsabilité,", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_716B6123-2040-71A2-3B8F-B2B91B978EF1"
        }, 
        {
          "begin": "1773308", 
          "end": 1846311, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Gardette : transition\nBelgique a voté. Flamand fait une percée historique. Tsunami politique ?\ninstabilité politique", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_1D64F959-8A86-FD3E-3FD1-B2B91B972648"
        }, 
        {
          "begin": "1846311", 
          "end": 2176406, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Patrick Rogiers : sur les résutats des élections belges", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_D7398F00-E4F5-9692-88D0-B2B91B976204"
        }, 
        {
          "begin": "2176406", 
          "end": 2207985, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Gardette : transition\nC. Broué : montée des nationalismes et séparatismes", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_21BCA9F6-A71C-C601-1247-B2B91B97A664"
        }, 
        {
          "begin": "2207985", 
          "end": 2248713, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Garrigou : sur les séparatismes, narcissisme des petites différences", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_45E25D8E-416B-8158-23DD-B2B91B9745CE"
        }, 
        {
          "begin": "2248713", 
          "end": 2519086, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "H. Gardette : Vuvuzela : tradition et calvaire", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_88FBDAB0-64C7-74B9-7C5A-B2B91B977EC3"
        }, 
        {
          "begin": "2519086", 
          "end": 2540542, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "C.Broué : question à Garrigou : sociologie du sport", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_6506C8B0-AAB0-3678-31FD-B2B91B978702"
        }, 
        {
          "begin": "2540542", 
          "end": 2647121, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Elimination de l'équipe de France\nArgent, politique du foot", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_CB104420-63C8-F957-78CF-B2B91B97D0B0"
        }, 
        {
          "begin": "2647121", 
          "end": 2657384, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "intermède musical", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_1947C9C6-B47F-1544-AD5E-B2B91B97A552"
        }, 
        {
          "begin": "2657384", 
          "end": 3012515, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Antony Bélanger (Courrier International) : Moscou, pièce de théatre à guichet fermé\nTheatre.doc : agonie de l'avocat en prison", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_874A4942-9AA9-CA9A-F595-B2B91B97210A"
        }, 
        {
          "begin": "3012515", 
          "end": 3013515, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
            "dc:created": "2010-09-06T15:53:44.626882", 
            "dc:modified": "2010-09-06T15:53:44.626882", 
            "dc:creator": "perso"
          }, 
          "id": "s_1F7790E7-BC3F-6C87-9B4F-B2B91B9769B6"
        }, 
        {
          "begin": "206240", 
          "end": 316720, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Interview : Alphonse Baudin\n\"comment meurt vos 25 francs\"\nabolitionniste, barricade,Victor Hugo, Victor", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_9CA4F1C6-6FA0-7070-EBCA-B293F1474ECC"
        }, 
        {
          "begin": "316720", 
          "end": 546458, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "actualité de Gardette : \n- Domenech et défaite francaise contre le Mexique\n- La France aura eu besoin de De Gaulle\n- 18 juin : 1815, défaite de waterloo\ndéfaite de Dien Bien \n- Belgique: éléctions et divorce Wallon et Flamands\n- Kirgistan : Pogrom contre les Ouzbeks, 200 morts.\n- Conflits Israélo-palestinien : enquete indépendante\n- Bloody Sunday, London dairy, répression sanglante. Rapport conclut à la seule culpabilité de l'armée britannique", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_F1A706C3-8CFD-8479-FE1A-B293F147FB10"
        }, 
        {
          "begin": "546458", 
          "end": 552728, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "intermède musicale", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_D87336F4-AF1E-1192-AD6F-B293F14750F6"
        }, 
        {
          "begin": "552728", 
          "end": 694963, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Retraite, travail allongé : méthode douce du gouvernement\nTony Eward communicant BP\nCatastrophe dans le Var\nApéro saucisson et pinard interdit\nécrivain portugais Saramago : l'évangile selon Jésus Christ", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_EA074915-79A3-E8C3-A7BD-B293F1472B4A"
        }, 
        {
          "begin": "695261", 
          "end": 725426, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "commentaire Alain Guarigou", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_20B4A5D9-D87C-329A-8D6E-B293F147D954"
        }, 
        {
          "begin": "725716", 
          "end": 784695, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Fond public - fond privé", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_F0A40BE7-0DE5-F4AE-00E7-B293F147C76E"
        }, 
        {
          "begin": "784695", 
          "end": 802807, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Gardette : Francois Fillon veut montrer l'exemple", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_801AE38E-9E88-347D-365A-B293F147FA32"
        }, 
        {
          "begin": "802807", 
          "end": 853566, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Reportage : Fillon et les privilèges des politiques", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_F5F3F6C7-2152-6FCA-3838-B293F147F4A6"
        }, 
        {
          "begin": "853566", 
          "end": 870284, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Caroline Broué à Garrigou : les privilèges ?", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_F01AD8C9-6F7F-0ED8-FCB8-B293F147EAE0"
        }, 
        {
          "begin": "870284", 
          "end": 899309, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "Réponse : privilège du cumul.", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_306A6A5E-BB28-DBB3-1B2C-B293F147B879"
        }, 
        {
          "begin": "899309", 
          "end": 900309, 
          "tags": null, 
          "media": "franceculture_retourdudimanche20100620", 
          "content": {
            "mimetype": "application/x-ldt-structured", 
            "color": "255", 
            "audio": {
              "mimetype": "audio/mp3", 
              "src": "", 
              "href": ""
            }, 
            "description": "", 
            "title": ""
          }, 
          "meta": {
            "dc:contributor": "perso", 
            "id-ref": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
            "dc:created": "2010-09-06T15:53:44.675786", 
            "dc:modified": "2010-09-06T15:53:44.675786", 
            "dc:creator": "perso"
          }, 
          "id": "s_40445FD2-80E5-F9C9-57B8-B293F1472D60"
        }
      ], 
      "annotation-types": [
        {
          "dc:contributor": "perso", 
          "dc:creator": "perso", 
          "dc:title": "Chapitrage Notes", 
          "id": "c_1F07824B-F512-78A9-49DB-6FB51DAB9560", 
          "dc:created": "2010-09-06T15:53:44.572226", 
          "dc:description": "", 
          "dc:modified": "2010-09-06T15:53:44.572226"
        }, 
        {
          "dc:contributor": "perso", 
          "dc:creator": "perso", 
          "dc:title": "Mes notes", 
          "id": "c_F6BB72C6-686E-1E8A-D775-B2B91B97C795", 
          "dc:created": "2010-09-06T15:53:44.626882", 
          "dc:description": "", 
          "dc:modified": "2010-09-06T15:53:44.626882"
        }, 
        {
          "dc:contributor": "perso", 
          "dc:creator": "perso", 
          "dc:title": "Mes notes", 
          "id": "c_393E05F0-80CC-9D29-A42B-B293F1478831", 
          "dc:created": "2010-09-06T15:53:44.675786", 
          "dc:description": "", 
          "dc:modified": "2010-09-06T15:53:44.675786"
        }, 
        {
          "dc:contributor": "perso", 
          "dc:creator": "perso", 
          "dc:title": "Chapitrage", 
          "id": "c_DE60F95E-73B8-922D-3AC7-6FB197A1BF16", 
          "dc:created": "2010-09-06T15:53:44.699595", 
          "dc:description": "", 
          "dc:modified": "2010-09-06T15:53:44.699595"
        }
      ]
};
};

IriSP.MockSerializer.prototype = new IriSP.Serializer();   

IriSP.MockSerializer.prototype.currentMedia = function() {
  return this._data.medias[0];
};
