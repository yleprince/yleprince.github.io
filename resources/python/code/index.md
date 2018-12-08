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
