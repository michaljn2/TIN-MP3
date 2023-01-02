export const groupList = [
    {
        "_id": 1,
        "shortcut": "2021Z-ASD-11c",
        "course": "ASD",
        "capacity": 16
    },
    {
        "_id": 2,
        "shortcut": "2021Z-TIN-19c",
        "course": "TIN",
        "capacity": 15
    },
    {
        "_id": 3,
        "shortcut": "2022L-MAS-1w",
        "course": "MAS",
        "capacity": 120
    }
]

export const groupDetailsList = [
    {
        "_id": 1,
        "shortcut": "2021Z-ASD-11c",
        "course": "ASD",
        "faculty": null,
        "capacity": 16,
        "studies": [
            {
                "_id": 1,
                "grade": 4,
                "itn": 1,
                "student_id": 1,
                "group_id": 1,
                "student":{
                    "_id": 1,
                    "firstName": "Jan",
                    "lastName": "Kowalski",
                    "index": "s1",
                    "birthDate": "2001-01-01T00:00:00.000Z",
                    "email": "s1@pja.edu.pl",
                    "password": "Haslo123",
                }
            }
        ]
    },
    {
        "_id": 2,
        "shortcut": "2021Z-TIN-19c",
        "course": "TIN",
        "faculty": "Bazy danych",
        "capacity": 15,
        "studies": [
            {
                "_id": 2,
                "grade": 4.5,
                "itn": 0,
                "student_id": 2,
                "group_id": 2,
                "student":{
                    "_id": 2,
                    "firstName": "Adam",
                    "lastName": "Nowak",
                    "index": "s2",
                    "birthDate": "2001-04-11T00:00:00.000Z",
                    "email": "s2@pja.edu.pl",
                    "password": "Haslo123",
                }
            }
        ]
    },
    {
        "_id": 3,
        "shortcut": "2022L-MAS-1w",
        "course": "MAS",
        "faculty": null,
        "capacity": 120,
        "studies": []
    }
]