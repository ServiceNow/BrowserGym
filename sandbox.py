from dataclasses import dataclass

from dataclasses_json import DataClassJsonMixin


@dataclass
class Test(DataClassJsonMixin):
    a: int
    b: str

    def do_something(self):
        print(self.a, self.b)


x: Test = Test(0, "hello")

x_json = x.to_json()

print(x_json)

y = Test.from_json(x_json)

y.do_something()
