# Python tips and tricks

## 1. Sorting a list by an other:

```python
names = ['Paul', 'Arthur', 'John']
scores = [10, 22, 5]
```

__Get scores sorted by name__

```python
for name, score in sorted(zip(names, scores)):
    print(name, score)
```
> ```sh
> Arthur 22
> John 5
> Paul 10
> ```

```python
[score for name, score in sorted(zip(names, scores))]
```

> ```sh
> [22, 5, 10]
> ```

__Get names sorted by score__
```python
for score, name in sorted(zip(scores, names)):
    print(score, name)
```

> ```sh
> 5 John
> 10 Paul
> 22 Arthur
> ```

```python
[name for score, name in sorted(zip(scores, names))]
```
> ```sh
> ['John', 'Paul', 'Arthur']
> ```

## 2. Difference between `append` and `extend`

No explaination is worth this example:

__`append`__
```python
mylist = ['a']
mylist.append(['b', 'c'])
print(mylist)
```

> ```sh
> ['a', ['b', 'c']]
> ```


__`extend`__
```python
mylist = ['a']
mylist.extend(['b', 'c'])
print(mylist)
```

> ```sh
> ['a', 'b', 'c']
> ```

## 3. Normalize columns (using pandas)

Mean + STD:
```py
normalized_df=(df-df.mean())/df.std()
```
Min-max normalization:
```py
normalized_df=(df-df.min())/(df.max()-df.min())
```

## 4. Json I/O

Load:
```python
import json

with open('data.txt') as json_file:
    data = json.load(json_file)
```

Write:
```python
import json

with open('data.txt', 'w') as outfile:
    json.dump(data, outfile)
```

## 5. Leading char:

```py
'Toto'.rjust(8, 'a')
>> aaaaToto
```

To append leading `0` you can use `.zfill(length)`.


