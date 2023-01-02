export const studentList = [
    {
        "_id": 1,
        "firstName": "Jan",
        "lastName": "Kowalski",
        "index": "s1"
    },
    {
        "_id": 2,
        "firstName": "Adam",
        "lastName": "Nowak",
        "index": "s2"
    },
    {
        "_id": 3,
        "firstName": "Marian",
        "lastName": "Kwiatkowski",
        "index": "s3"
    }
]

export const studentDetailsList = [
    {
        "_id": 1,
        "firstName": "Jan",
        "lastName": "Kowalski",
        "index": "s1",
        "birthDate": "2001-01-01T00:00:00.000Z",
        "email": "s1@pja.edu.pl",
        "password": "Haslo123",
        "studies": [
            {
                "_id": 1,
                "grade": 4,
                "itn": 1,
                "student_id": 1,
                "group_id": 1,
                "group": {
                    "_id": 1,
                    "shortcut": "2021Z-TIN-19c",
                    "course": "TIN",
                    "faculty": null,
                    "capacity": 15
                }
            }
        ]
    },
    {
        "_id": 2,
        "firstName": "Adam",
        "lastName": "Nowak",
        "index": "s2",
        "birthDate": "2001-04-11T00:00:00.000Z",
        "email": "s2@pja.edu.pl",
        "password": "Haslo123",
        "studies": [
            {
                "_id": 2,
                "grade": 4.5,
                "itn": 0,
                "student_id": 2,
                "group_id": 1,
                "group": {
                    "_id": 1,
                    "shortcut": "2021Z-TIN-19c",
                    "course": "TIN",
                    "faculty": null,
                    "capacity": 15
                }
            }
        ]
    },
    {
        "_id": 3,
        "firstName": "Marian",
        "lastName": "Kwiatkowski",
        "index": "s3",
        "birthDate": "2001-06-17T00:00:00.000Z",
        "email": "s3@pja.edu.pl",
        "password": "Haslo123",
        "studies": []
    }
]